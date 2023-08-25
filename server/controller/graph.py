import sys
import json
from langchain.embeddings.openai import OpenAIEmbeddings
import numpy as np
import os
import time
import pinecone
os.environ["OPENAI_API_KEY"] = "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"


def get_similar_messages(query_text):
    # Initialize Pinecone with your provided API key and environment
    pinecone.init(
        api_key="a2331330-f063-44bc-b9c2-9fe9df32bac6",
        environment="us-west1-gcp-free"
    )

    # Create a connection to the Pinecone index
    index = pinecone.Index(index_name="graph")

    # Initialize OpenAIEmbeddings
    openai_embeddings = OpenAIEmbeddings(deployment="text-embedding-ada-002")
    time.sleep(5)
    # Convert the query text into an embedding using OpenAIEmbeddings
    query_embedding = openai_embeddings.embed_documents([query_text])[0]

    # Perform a similarity search using the Pinecone index
    similar_docs = index.query(queries=[query_embedding], top_k=3)  # Change top_k to the desired number

    # Extract and store similar messages and their similarity scores
    similar_scores = []
    for result in similar_docs.results[0].matches:
        similar_scores.append(result.score)
    similar_count = len(similar_docs.results[0].matches)

    # Return the list of similar messages and scores
    return  similar_scores ,similar_count
def main():
    if len(sys.argv) < 2:
        print("No input data provided")
        return
    input_data_json = sys.argv[1]
    input_data = json.loads(input_data_json)
    categories = input_data['categories']
    results = {}  # Dictionary to store results
    for category in categories:
        #print(category)
        similar_scores,similar_count = get_similar_messages(category)
        #print(similar_count)
        #for score in similar_scores:
            #print("Score:",score )
        results[category] = similar_count
        time.sleep(5)
    json_output = json.dumps(results)
    print(json_output)

if __name__ == "__main__":
    main()
