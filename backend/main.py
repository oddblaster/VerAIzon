import os
import sys

import openai
from langchain.chains import ConversationalRetrievalChain, RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain.llms import OpenAI
from langchain.vectorstores import Chroma

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from urllib.parse import urlencode

import constants

os.environ["OPENAI_API_KEY"] = constants.APIKEY


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


# Enable to save to disk & reuse the model (for repeated queries on the same data)
PERSIST = False


chat_history = []
query = None


def generate_answer(query):
    if len(sys.argv) > 1:
        query = sys.argv[1]

    if PERSIST and os.path.exists("persist"):
        print("Reusing index...\n")
        vectorstore = Chroma(
            persist_directory="persist", embedding_function=OpenAIEmbeddings()
        )
        index = VectorStoreIndexWrapper(vectorstore=vectorstore)
    else:
        loader = TextLoader("data/data.txt")  # Use this line if you only need data.txt
        if PERSIST:
            index = VectorstoreIndexCreator(
                vectorstore_kwargs={"persist_directory": "persist"}
            ).from_loaders([loader])
        else:
            index = VectorstoreIndexCreator().from_loaders([loader])

    chain = ConversationalRetrievalChain.from_llm(
        llm=ChatOpenAI(model="gpt-3.5-turbo"),
        retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
    )

    if not query:
        query = f"You are a flamboyant salesman trying to convince customers that they need to buy one of the mobile plans. You will only be advocating for verizon and maintain a professional conduct: {query}"

    result = chain({"question": query, "chat_history": chat_history})

    chat_history.append((query, result["answer"]))

    return {"answer": result}


@app.get("/getinfo")
async def get_info(query: str = Query(...)):
    print("GETTING ANSWER...")

    # URL encode only the query parameter
    encoded_query = urlencode({"query": query})

    # Call generate_answer with the original query
    answer = generate_answer(encoded_query)["answer"]

    response = {"original_query": query, "answer": answer}

    return response


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5000)
