from flask import render_template, url_for, flash, redirect, request
from flask import Flask
app = Flask(__name__)
import json
import requests 
from collections import defaultdict 
base_url1="https://api.themoviedb.org/3/{}/{}/{}?api_key={}"
api_key="227d08eb2c46d0555e697f42bf48e689"
base_url2="https://api.themoviedb.org/3/{}/{}?api_key={}"
@app.route("/",methods=['GET'])
def home():
    return redirect(url_for('static', filename='home.html'))
@app.route("/slideshow",methods=['GET'])
def slideshow():
    request_endpoint=base_url1.format("trending","movie","week",api_key)
    re=requests.get(request_endpoint)
    y=re.json()
    result = []
    for item,x in enumerate(y["results"]):
        if(item == 5):
            break
        
        my_dict={}
        my_dict['title']=y["results"][item]["title"]
        my_dict['release_date']=y["results"][item]["release_date"]
        my_dict['backdrop_path']=y["results"][item]["backdrop_path"]
        result.append(my_dict)
    d = {}
    d["results"] = result
    d = json.dumps(d)
    return d

@app.route("/slideshowmovies",methods=['GET'])
def slideshowmovies():
    request_endpoint=base_url2.format("tv","airing_today",api_key)
    re=requests.get(request_endpoint)
    y=re.json()
    result = []
    for item,x in enumerate(y["results"]):
        if(item == 5):
            break
        
        my_dict={}
        my_dict['name']=y["results"][item]["name"]
        my_dict['first_air_date']=y["results"][item]["first_air_date"]
        my_dict['backdrop_path']=y["results"][item]["backdrop_path"]
        result.append(my_dict)
    d = {}
    d["results"] = result
    d = json.dumps(d)
    return d

@app.route("/moviesearch<id>",methods=['GET'])
def moviesearch(id):
    url="https://api.themoviedb.org/3/search/movie?api_key={}&language=en-US&query={}&page=1&include_adult=false"
    request_endpoint=url.format(api_key,id)
    re=requests.get(request_endpoint)
    y=re.json()
    result = []
    url="https://api.themoviedb.org/3/genre/movie/list?api_key=227d08eb2c46d0555e697f42bf48e689&language=en-US"
    re=requests.get(url)
    genre=re.json()
    genre_list = {}
    for i,j in enumerate(genre["genres"]):
           genre_list[genre["genres"][i]["id"]] = genre["genres"][i]["name"]

    genresid=""
    
          
    for item,x in enumerate(y["results"]):
        if(item == 10):
            break
        
        my_dict={}
        my_dict['title']=y["results"][item]["title"]
        my_dict['id']=y["results"][item]["id"]
        my_dict['overview']=y["results"][item]["overview"]
        my_dict['poster_path']=y["results"][item]["poster_path"]
        my_dict['release_date']=y["results"][item]["release_date"][0:4]
        my_dict['vote_average']=y["results"][item]["vote_average"]
        my_dict['vote_count']=y["results"][item]["vote_count"]
        my_dict['type']="movie"
        for f in y["results"][item]["genre_ids"]:
            genresid=genresid+","+genre_list[f]
            
        my_dict['genre_ids']=genresid[1:]
        genresid=""
        result.append(my_dict)
    d = {}
    d["results"] = result
    d = json.dumps(d)
    return d

@app.route("/tvshowsearch<id>",methods=['GET'])
def tvshowsearch(id):
    url="https://api.themoviedb.org/3/search/tv?api_key={}&language=en-US&query={}&page=1&include_adult=false"
    request_endpoint=url.format(api_key,id)
    re=requests.get(request_endpoint)
    y=re.json()
    result = []

    url="https://api.themoviedb.org/3/genre/tv/list?api_key=227d08eb2c46d0555e697f42bf48e689&language=en-US"
    re=requests.get(url)
    genre=re.json()
    genre_list = {}
    genresid=""

    for i,j in enumerate(genre["genres"]):
           genre_list[genre["genres"][i]["id"]] = genre["genres"][i]["name"]
        
    for item,x in enumerate(y["results"]):
        if(item == 10):
            break
        
        my_dict={}
        my_dict['title']=y["results"][item]["name"]
        my_dict['id']=y["results"][item]["id"]
        my_dict['overview']=y["results"][item]["overview"]
        my_dict['poster_path']=y["results"][item]["poster_path"]
        my_dict['release_date']=y["results"][item]["first_air_date"][0:4]
        my_dict['vote_average']=y["results"][item]["vote_average"]
        my_dict['vote_count']=y["results"][item]["vote_count"]
        my_dict['backdrop_path']=y["results"][item]["backdrop_path"]
        my_dict['type']="tv"
        for f in y["results"][item]["genre_ids"]:
            genresid=genresid+","+genre_list[f]
            
        my_dict['genre_ids']=genresid[1:]
        genresid=""
        result.append(my_dict)
    d = {}
    d["results"] = result
    d = json.dumps(d)
    return d

@app.route("/multishowsearch<id>",methods=['GET'])
def multishowsearch(id):
    url="https://api.themoviedb.org/3/search/multi?api_key={}&language=en-US&query={}&page=1&include_adult=false"
    request_endpoint=url.format(api_key,id)
    re=requests.get(request_endpoint)
    y=re.json()
    result = []

    urltv="https://api.themoviedb.org/3/genre/tv/list?api_key=227d08eb2c46d0555e697f42bf48e689&language=en-US"
    re=requests.get(urltv)
    genretv=re.json()

    urlmovie="https://api.themoviedb.org/3/genre/movie/list?api_key=227d08eb2c46d0555e697f42bf48e689&language=en-US"
    re=requests.get(urlmovie)
    genremovie=re.json()

    genre_list_tv = {}
    genre_list_movie = {}
    genresid=""


    for i,j in enumerate(genretv["genres"]):
           genre_list_tv[genretv["genres"][i]["id"]] = genretv["genres"][i]["name"]

    for i,j in enumerate(genremovie["genres"]):
           genre_list_movie[genremovie["genres"][i]["id"]] = genremovie["genres"][i]["name"]


        
    for item,x in enumerate(y["results"]):
        
        if(item == 10):
            break

        if y["results"][item]["media_type"] == "tv":

            my_dict={}
            my_dict['title']=y["results"][item]["name"]
            my_dict['id']=y["results"][item]["id"]
            my_dict['overview']=y["results"][item]["overview"]
            my_dict['poster_path']=y["results"][item]["poster_path"]
            my_dict['release_date']=y["results"][item]["first_air_date"][0:4]
            my_dict['vote_average']=y["results"][item]["vote_average"]
            my_dict['vote_count']=y["results"][item]["vote_count"]
            my_dict['backdrop_path']=y["results"][item]["backdrop_path"]
            my_dict['type'] = y["results"][item]["media_type"]

            for f in y["results"][item]["genre_ids"]:
                genresid=genresid+","+genre_list_tv[f]
            

        else:

            my_dict={}
            my_dict['title']=y["results"][item]["title"]
            my_dict['id']=y["results"][item]["id"]
            my_dict['overview']=y["results"][item]["overview"]
            my_dict['poster_path']=y["results"][item]["poster_path"]
            my_dict['release_date']=y["results"][item]["release_date"][0:4]
            my_dict['vote_average']=y["results"][item]["vote_average"]
            my_dict['vote_count']=y["results"][item]["vote_count"]
            my_dict['type'] = y["results"][item]["media_type"]
            for f in y["results"][item]["genre_ids"]:
                genresid=genresid+","+genre_list_movie[f]
            
            
        my_dict['genre_ids']=genresid[1:]
        genresid=""
        result.append(my_dict)

        
    d = {}
    d["results"] = result
    d = json.dumps(d)
    return d









@app.route("/movieshowmoresearch<id>",methods=['GET'])
def movieshowmoresearch(id):
    url="https://api.themoviedb.org/3/movie/{}?api_key={}&language=en- US"
    request_endpoint=url.format(id,api_key)
    # print(request_endpoint)
    re=requests.get(request_endpoint)
    y=re.json()

    url = "https://api.themoviedb.org/3/movie/{}/credits?api_key={}&language=en-US"
    request_endpoint=url.format(id,api_key)
    re=requests.get(request_endpoint)
    credit=re.json()

    url = "https://api.themoviedb.org/3/movie/{}/reviews?api_key={}&language=en-US&page=1"
    
    request_endpoint=url.format(id,api_key)
    re=requests.get(request_endpoint)
    review = re.json()

    result = []
    languages = ""  
    genresid = ""
    
            
    my_dict={}
    my_dict['cast']=defaultdict()
    my_dict['reviews'] = defaultdict()

    my_dict['runtime']=y["runtime"]
    my_dict['id']=y["id"]
    my_dict['title']=y["title"]
    my_dict['release_date']=y["release_date"][:4]
    my_dict['vote_average']=y["vote_average"]/2
    my_dict['vote_count']=y["vote_count"]
    my_dict['poster_path']=y["poster_path"]
    my_dict['backdrop_path']=y["backdrop_path"]
    my_dict['overview'] = y["overview"]
    
    for i,j in enumerate(y["spoken_languages"]):
        languages = languages + "," + y["spoken_languages"][i]["english_name"]

    my_dict['spoken_languages'] = languages[1:]
    languages = ""

    for f,h in enumerate(y["genres"]):
        genresid = genresid + "," + y["genres"][f]["name"]
        
        
    my_dict['genre_ids']=genresid[1:]
    genresid=""
    
    # for movie credits
    for i,j in enumerate(credit["cast"]):

        if i == 8:
            break

        p = credit["cast"][i]["name"]
        q = credit["cast"][i]["profile_path"]
        r = credit["cast"][i]["character"]

        my_dict["cast"][i]= [p,q,r]
        
    # for reviews 

    
        
    for i,j in enumerate(review["results"]):
        if i == 5:
            break

        p = review["results"][i]["author_details"]["username"]
        q = review["results"][i]["author_details"]["rating"]
        r = review["results"][i]["content"]
        s = review["results"][i]["created_at"][5:7] + "/" + review["results"][i]["created_at"][8:10] + "/" + review["results"][i]["created_at"][:4]
        
        

        my_dict["reviews"][i] = [p,r,q,s]
        
    
    result.append(my_dict)
    
    
    








    d = {}
    d["results"] = result
    print(d["results"][0],"max-villan-movies")
    d = json.dumps(d)
    return d



@app.route("/tvshowmoresearch<id>",methods=['GET'])
def tvshowmoresearch(id):
    url="https://api.themoviedb.org/3/tv/{}?api_key={}&language=en-US"
    request_endpoint=url.format(id,api_key)
   
    re=requests.get(request_endpoint)
    y=re.json()

    url = "https://api.themoviedb.org/3/tv/{}/credits?api_key={}&language=en-US"
    request_endpoint=url.format(id,api_key)
    re=requests.get(request_endpoint)
    
    credit=re.json()

    url = "https://api.themoviedb.org/3/tv/{}/reviews?api_key={}&language=en-US&page=1"
    
    request_endpoint=url.format(id,api_key)
    re=requests.get(request_endpoint)
    review = re.json()
    



    result = []
    languages = ""  
    genresid = ""


    
    
    my_dict={}
    my_dict['cast']={}
    my_dict['reviews'] = {}

    my_dict['runtime']=y["episode_run_time"]
    my_dict['id']=y["id"]
    my_dict['title']=y["name"]
    my_dict['release_date']=y["first_air_date"][:4]
    my_dict['vote_average']=y["vote_average"]/2
    my_dict['vote_count']=y["vote_count"]
    my_dict['poster_path']=y["poster_path"]
    my_dict['backdrop_path']=y["backdrop_path"]
    my_dict['overview'] = y["overview"]
    my_dict['seasons']=y["number_of_seasons"]
    
    for i,j in enumerate(y["spoken_languages"]):
        languages = languages + "," + y["spoken_languages"][i]["english_name"]

    my_dict['spoken_languages'] = languages[1:]
    languages = ""

    for f,h in enumerate(y["genres"]):
        genresid = genresid + "," + y["genres"][f]["name"]
        
        
    my_dict['genre_ids']=genresid[1:]
    genresid=""
    
    # for movie credits
    for i,j in enumerate(credit["cast"]):

        if i == 8:
            break

        p = credit["cast"][i]["name"]
        q = credit["cast"][i]["profile_path"]
        r = credit["cast"][i]["character"]

        my_dict["cast"][i]= [p,q,r]
        
    # for reviews 

    for i,j in enumerate(review["results"]):
        if i == 5:
            break

        p = review["results"][i]["author_details"]["username"]
        q = review["results"][i]["author_details"]["rating"]
        r = review["results"][i]["content"]
        s = review["results"][i]["created_at"][:10]

        my_dict["reviews"][i] = [p,r,q,s]
    
    result.append(my_dict)
        
    
    d = {}
    d["results"] = result
    print(d["results"][0])
    d = json.dumps(d)
    return d


















if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5008)
    
    
    