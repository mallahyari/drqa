# Leveraging LangChain and Large Language Models for Accurate PDF-Based Question Answering

![system architecure](QA-Langchain-LLM.svg)

This repo is to help you build a powerful question answering system that can accurately answer questions by combining [Langchain](https://github.com/hwchase17/langchain) and large language models (LLMs) including OpenAI's GPT3 models.

The image shows the architechture of the system and you can change the code based on your needs. The main components of this code:

- **Backend:** It has been written in Python using FastAPI framework and does the following:

  - handles all the requests coming from client side.
  - creates the _data processing pipeline_. It converts PDF documents to text and split them to smaller chuncks. You can use it for other document types, thanks to langchain for providng the `data loaders`. Backend also handles the embedding part. It initializes the _embedding model_. I have used `SentenceTransformers` to make it **faster** and **free of cost**. You can use OpenAI embeddings or other ones. I have used [Qdrant](https://qdrant.tech/) cloud (free tier) to host my embeddings and textual documents for fast search and retrieval. It can be replaced by other _vector-based_ databases such as Pinecone, Weaviate, Elasticsearch, etc., either on the cloud or _mostly locally_ hosted, depending on the vendor.

- **Frontend:** I developed it using React/Typescript.

https://user-images.githubusercontent.com/28068313/228715902-e38d0b44-6736-4b56-94f6-dc31fa73783a.mp4

## Quick start

Clone the repo:

`git clone https://github.com/mallahyari/drqa.git`

Running the frontend is very straightforward. You simply go to the `frontend` directory and run:

`npm install`

For running the backend, first create a virtual environment and then from `backend/app` directory run:

`pip install -r requirements.txt`

## Advantages

This repo can be used as a general guide line for how to combine your own data with LLMs with other frameworks like Langchain, [LlamaIndex](https://github.com/jerryjliu/llama_index). Also, since it only uses OpenAI for final response generation, it reduces the API call cost significantly.

## Future improvements

- Streaming feature: The client will get the stream of response as soon as it becomes available.
- Cache: Adding cache could make the system much more efficient. For similar or repeatitive questions, you don't need to generate response/call API as they are stored in the cache
- UI: Rewriting the UI for better user experience
- Adding different types of documents for question-answering. Currently, you can only use it for PDF files.
- Adding memory for long conversations and summarization
- and many more!

## Discussion and Contribution

If you have any comment or feedback, please don't hesitate to use the `Discussions` section and open a new topic. You can also reach out directly via [Linkedin](https://www.linkedin.com/in/mehdiallahyari/) or [Twitter](https://twitter.com/MehdiAllahyari)
