# setup.py
from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="fluffy_tag_processor",
    version="1.0.0",
    author="Mohamed Elbeskeri",
    author_email="mohamed.ahmed.4894@gmail.com",
    description="A lightweight processor for XML-like tags in LLM outputs",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/m-ahmed-elbeskeri/FluffyTagProcessor",
    packages=find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Topic :: Text Processing :: Markup",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    python_requires=">=3.7",
)

