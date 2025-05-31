# Commodore Magazine PDF Downloader

This Node.js script downloads archived issues of the Turkish _Commodore_ magazine from [retrodergi.com](https://retrodergi.com). It generates correct download links based on the magazine's actual issue and date structure, starting from **March 1986 (Sayi 01)** to **July 1992**.

## Features

- Automatically builds issue URLs based on month/year
- Handles Turkish characters safely for URL compatibility
- Skips missing or unavailable issues without crashing
- Saves all downloaded PDFs to a local folder

## Requirements

- Node.js (v14+ recommended)

## Installation

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

## Usage

```bash
node app.js
```

for probe link

```bash
node appcommodore.js
```

The script creates a folder named commodore-pdfs and downloads the archive from
`https://retrodergi.com/commodore/`

## Writer

Devrim Savas Yilmaz 2025
Written to make life easier. Feel free to copy, use, or improve.
