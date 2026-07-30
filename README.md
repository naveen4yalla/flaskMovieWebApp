# FlaskMovieWebApp

A Flask web app for browsing trending movies and TV shows and searching The Movie Database (TMDB).

## What It Is

FlaskMovieWebApp is a small full-stack project. A Flask backend exposes JSON endpoints that
proxy requests to the [TMDB API](https://www.themoviedb.org/), and a static single-page
frontend (plain HTML/CSS/JavaScript) consumes those endpoints to render the UI. Serving the
API and the frontend from the same Flask app keeps the TMDB API key on the server side rather
than exposing it in the browser.

## Features

- Trending movies of the week displayed as a slideshow on the home screen.
- TV shows airing today.
- Search for movies, TV shows, or both at once (multi-search), with results showing poster,
  rating, release year, and genres.
- Detailed view for a selected movie or show, including runtime/seasons, spoken languages,
  top cast, and recent user reviews.

## Tech Stack

- **Backend:** Python 3.7, [Flask](https://flask.palletsprojects.com/) 1.1.2,
  [requests](https://requests.readthedocs.io/)
- **Frontend:** Vanilla HTML, CSS, and JavaScript (`static/home.html`, `static/funcs110.js`,
  `static/test30.css`)
- **Data source:** [The Movie Database (TMDB) API](https://developers.themoviedb.org/3)

## API Endpoints

| Route                        | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `/`                          | Redirects to the static frontend (`home.html`)    |
| `/slideshow`                 | Trending movies of the week                       |
| `/slideshowmovies`           | TV shows airing today                             |
| `/moviesearch<query>`        | Search movies                                     |
| `/tvshowsearch<query>`       | Search TV shows                                    |
| `/multishowsearch<query>`    | Combined movie + TV search                        |
| `/movieshowmoresearch<id>`   | Movie details, cast, and reviews                  |
| `/tvshowmoresearch<id>`      | TV show details, cast, and reviews                |

## Setup

### Prerequisites

- Python 3.7+
- A free TMDB API key. Create an account at
  [themoviedb.org](https://www.themoviedb.org/settings/api) and request an API key.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/naveen4yalla/flaskMovieWebApp.git
cd flaskMovieWebApp

# 2. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Provide your TMDB API key (read from the TMDB_API_KEY environment variable)
export TMDB_API_KEY="your_tmdb_api_key_here"   # On Windows: set TMDB_API_KEY=...

# 5. Run the app
python app.py
```

The server starts on `http://0.0.0.0:5008`. Open <http://localhost:5008/> in your browser.

## Screenshots

<!-- Add screenshots of the home screen, search results, and detail view here. -->

_Screenshots coming soon._

## License

See [LICENSE](LICENSE).
