

import requests
import time

def get_earliest_release_year(song_title, artist_name):
    """
    Fetches the earliest release year of a song from the MusicBrainz API.

    Args:
        song_title (str): The title of the song.
        artist_name (str): The name of the artist.

    Returns:
        str: The earliest release year as a string, or None if not found.
    """
    # MusicBrainz API endpoint for recording searches
    url = "https://musicbrainz.org/ws/2/recording/"

    # Parameters for the API request
    params = {
        "query": f'recording:"{song_title}" AND artist:"{artist_name}"',
        "fmt": "json"
    }

    # MusicBrainz API requires a descriptive User-Agent header
    headers = {
        "User-Agent": "My80sList-Updater/1.0 (myemail@example.com)"
    }

    try:
        # Make the API request
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes

        data = response.json()

        # Find the earliest release date from the search results
        earliest_year = None
        if "recordings" in data and data["recordings"]:
            # Check the first recording for releases
            recording = data["recordings"][0]
            if "releases" in recording:
                for release in recording["releases"]:
                    if "date" in release and release["date"]:
                        year = release["date"].split('-')[0]
                        if year.isdigit():
                            year = int(year)
                            if earliest_year is None or year < earliest_year:
                                earliest_year = year

        if earliest_year:
            return str(earliest_year)
        else:
            return None

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == '__main__':
    # Example usage with a song from your data
    song_title = "You Spin Me Round (Like a Record)"
    artist_name = "Dead Or Alive"

    print(f"Searching for the release year of '{song_title}' by {artist_name}...")

    # Add a delay to respect the MusicBrainz API rate limit (1 request per second)
    time.sleep(1)

    year = get_earliest_release_year(song_title, artist_name)

    if year:
        print(f"The earliest release year found is: {year}")
    else:
        print("Could not find the release year for this song.")

    # Example with another song
    song_title = "Total Eclipse of the Heart"
    artist_name = "Bonnie Tyler"
    print(f"\nSearching for the release year of '{song_title}' by {artist_name}...")
    time.sleep(1)
    year = get_earliest_release_year(song_title, artist_name)
    if year:
        print(f"The earliest release year found is: {year}")
    else:
        print("Could not find the release year for this song.")

