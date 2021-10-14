var search_state=false
var no_result=false
function divView(divstate){
    if (divstate=='search')
    {  if(search_state==true)
        {
            
        } 
        else{
        document.getElementsByClassName("tablinks")[0].style.color="white"
        document.getElementsByClassName("tablinks")[1].style.color="#97252c"
        container=document.getElementsByClassName('main')
        container[0].style.display='none'
        container=document.getElementsByClassName('main2')
        container[0].style.display='block'
        }
    }
    else{
        if(search_state==true)
        {
            deletecontainers()
        }
        document.getElementsByClassName("tablinks")[0].style.color="#a6241c"
        document.getElementsByClassName("tablinks")[1].style.color="white"
        container=document.getElementsByClassName('main2')
        container[0].style.display='none'
        container=document.getElementsByClassName('main')
        container[0].style.display='block'
        fetchmovieslideshow()
    }
}

  function fetchmovieslideshow(){
       fetch('/slideshow')
      .then(response => response.json())
      .then(data1=>fetchtvshows(data1))
    }
    function fetchtvshows(data1){
      fetch('/slideshowmovies')
      .then(response => response.json())
      
      .then(data2 => slideshow(data1,data2))
    }
   function slideshow(data1,data2)
   {  var index=0
       carosouel()
     
        function carosouel(){
           if (index==5){
           }
           else{
           var imageid= data1['results'][index]['backdrop_path']
           var imageid2=data2['results'][index]['backdrop_path']
           var f = document.getElementsByClassName("mySlides")
           var i=document.getElementsByClassName("textmatter")
           if (imageid==null || imageid=="")
           {
             
             f[0].src="movie-placeholder.jpeg"
           }
           else{
           f[0].src="http://image.tmdb.org/t/p/w780/"+imageid}
           i[0].textContent=data1['results'][index]['title']+" ("+data1['results'][index]['release_date'].substring(0,4)+")"
           if (imageid2==null || imageid2=="")
           {
            f[1].src="movie-placeholder.jpeg"
           }
           else{
           f[1].src="http://image.tmdb.org/t/p/w780/"+imageid2}
           i[1].textContent=data2['results'][index]['name']+" ("+data2['results'][index]['first_air_date'].substring(0,4)+")"
           index++
           setTimeout(carosouel,3000)}
        }
       
   }

function clearfields(){
    document.getElementById('fname').value=""
    document.getElementById('category').value=""
}
function validatsearch(){
    selectElement = document.getElementById("category")
    if(document.getElementById('fname').value == "" ||  selectElement.value  =='')
    {
        alert("Please enter valid values.")
        
}
    else{
        searchmoviestvshow()
    }
}
function searchmoviestvshow()
{
    var arg1=document.getElementById("category").value
    var arg2=document.getElementById("fname").value
    
    if (arg1=="Movies")
    {
    fetch('/moviesearch'+arg2)
    .then(response => response.json())
    .then(data => createdivcontainers(data))
    }
    else if (arg1 ==  "TV Shows")
    {
        fetch('/tvshowsearch'+arg2)
        .then(response => response.json())
        .then(data => createdivcontainers(data))

    }
    else
    {
        fetch('/multishowsearch'+arg2)
        .then(response => response.json())
        .then(data => createdivcontainers(data))    
    }

}



function createdivcontainers(data)

{  
    var f= document.getElementsByClassName("main2")
    var node_h=document.createElement("h3")
    if (Object.keys(data["results"]).length === 0 && data.constructor === Object){
    if(search_state==true){
        deletecontainers()
    }
    if(no_result==false){
    var node_delete=document.createElement("h3")
    node_h.className="No-heading-results"
    node_h.innerHTML="No Results Found"
    f[0].appendChild(node_h)
    no_result=true
    }
}
else{
    if (no_result==true && search_state==false){
        document.getElementsByClassName("No-heading-results")[0].innerHTML=""
        document.getElementsByClassName("No-heading-results")[0].remove()
     
        no_result=false
    }
    
    if (search_state==true)
    {
        deletecontainers()
    }

    
    
    node_h.className="heading-results"
    node_h.innerHTML="Showing results..."
    f[0].appendChild(node_h)
    for (let k in data["results"]) {
    
    var node = document.createElement("div")
    node.className = "results"
    var image
    
    if (data['results'][k]['poster_path']==null||data['results'][k]['poster_path']==""){
        image="posterpath.jpeg"
    }
    else{
    image="http://image.tmdb.org/t/p/w780/" + data['results'][k]['poster_path']}

    rating = data["results"][k]["vote_average"]/2
    node.innerHTML = '<img class="search_poster"src = ' + image + ' ><h2 class="s-1"><br>'+ data["results"][k]["title"]+ '</h2>'+
    '<p class="s-2" >' + data["results"][k]["release_date"] + '&nbsp|&nbsp' + data["results"][k]["genre_ids"] + '</p>'+
    '<p class="s-3"><span class="star"> &#9733; ' + rating + '/5 </span> &nbsp <sup>' + data["results"][k]["vote_count"] + '&nbspvotes </sup></p>'+
    '<p class="s-4">' + data["results"][k]["overview"]  + '<br></p>'+'<button class="btn-show-more" type="button" value = '+ data["results"][k]["id"] + ","+ k+'>Show more</button>'
    f[0].appendChild(node)
}
    search_state=true
    var showmoreButtons = document.getElementsByClassName("btn-show-more").length;
    for (var i = 0; i < showmoreButtons; i++) {
    document.getElementsByClassName("btn-show-more")[i].addEventListener("click", function() {
        
        var split_value = this.value.split(',');
        var pop_up_data;
        var body=document.getElementsByTagName("BODY")[0];
       
        if(data["results"][split_value[1]]["type"]=="movie")
        {fetch('/movieshowmoresearch'+split_value[0])
        .then(response => response.json())
        .then(data_popup => happy(data_popup))}
        if(data["results"][split_value[1]]["type"]=="tv"){
            fetch('/tvshowmoresearch'+split_value[0])
            .then(response => response.json())
            .then(data_popup => happy(data_popup))  
        }
        // body.style.position="fixed"
        document.getElementsByClassName("pop-up")[0].style.position="fixed"
        document.getElementsByClassName("pop-up")[0].style.display="block"
        

        var close_button=document.getElementsByClassName("clearx-button")[0]
        close_button.addEventListener("click", function() {
            popup_delete()
        document.getElementsByClassName("pop-up")[0].style.display="none"
        document.getElementsByTagName("BODY")[0].style.position="relative"
       

});
    });

    
}
}


    


}

function happy(pop_up_data)
{
    var image
    if (pop_up_data["results"][0]["backdrop_path"]==null || pop_up_data["results"][0]["backdrop_path"]=="")
    {
        image="movie-placeholder.jpeg"
    }
    else{
        image="https://image.tmdb.org/t/p/w780" + pop_up_data["results"][0]["backdrop_path"]
    }
    document.getElementById("poster-path-popup").src=image
    document.getElementById("pop-text-heading").innerText=pop_up_data["results"][0]["title"]
    document.getElementById("popup-movie-website").href="https:\\www.themoviedb.org/movie/"+pop_up_data["results"][0]["id"]

    if (pop_up_data["results"][0]["release_date"] && pop_up_data["results"][0]["genre_ids"])
    {
    document.getElementsByClassName("text-wrapper-matter")[1].innerText=pop_up_data["results"][0]["release_date"]+"|"+pop_up_data["results"][0]["genre_ids"]
    }

    else if(pop_up_data["results"][0]["release_date"])
    {
        document.getElementsByClassName("text-wrapper-matter")[1].innerText=pop_up_data["results"][0]["release_date"]+"| N/A"
    }

    else if(pop_up_data["results"][0]["genre_ids"])
    {
        document.getElementsByClassName("text-wrapper-matter")[1].innerText = "N/A |" + pop_up_data["results"][0]["genre_ids"]

    }

    else{
        document.getElementsByClassName("text-wrapper-matter")[1].innerText = "N/A | N/A"
    }
    document.getElementById("popup-rating").innerText=pop_up_data["results"][0]["vote_average"]+"/5 "
    document.getElementById("popup-votes").innerText=pop_up_data["results"][0]["vote_count"]+" votes"
    document.getElementsByClassName("text-wrapper-matter")[3].innerText=pop_up_data["results"][0]["overview"]
    if(pop_up_data["results"][0]["spoken_languages"])
    {
    document.getElementById("popup-italic").innerText="Spoken languages: "+pop_up_data["results"][0]["spoken_languages"]
    }
    else{
        document.getElementById("popup-italic").innerText="Spoken languages: N/A"
    }
    var cast_real_name="N/A"
    var cast_movie_name="N/A"
    var vas="N/A"
    counter_cast=0
    var cast_post
    for (let i = 1; i < 9; i++) {
        if(pop_up_data["results"][0]["cast"][i-1]){
        //if (pop_up_data["results"][0]["cast"][i-1][1] != null){
        var poster_path_image="placeholder.jpeg"
        var node = document.createElement("div")
        node.className = "column"
        counter_cast++
        if ( counter_cast==1){document.getElementsByClassName("row")[0].style.display="block"
            cast_post=document.getElementsByClassName("row")[0]}
        if ( counter_cast==5){document.getElementsByClassName("row")[1].style.display="block"
           cast_post=document.getElementsByClassName("row")[1]}
        if (pop_up_data["results"][0]["cast"][i-1][0]!=""||pop_up_data["results"][0]["cast"][i-1][0]!=null){
            cast_real_name=pop_up_data["results"][0]["cast"][i-1][0]
        }
        if (pop_up_data["results"][0]["cast"][i-1][2]!=""||pop_up_data["results"][0]["cast"][i-1][2]!=null){
            cast_movie_name=pop_up_data["results"][0]["cast"][i-1][2]
            vas="AS"
        }
        if (pop_up_data["results"][0]["cast"][i-1][1] != null){
        poster_path_image="https://image.tmdb.org/t/p/w185/"+pop_up_data["results"][0]["cast"][i-1][1]}
        node.innerHTML ='<img id="cast"style="width:100%; background-color:yellow;" class="img-box" src="'+poster_path_image+'"><p class="text-popup"><b>'+ cast_real_name+ '</b></p> <p class="text-popup">'+vas+'</p> <P class="text-popup">'+cast_movie_name+'</P>'
        cast_post.appendChild(node)
    //}
}
if (counter_cast==0){
    // console.log("")
    document.getElementById("cast-popup-id").innerText= ""
    document.getElementById("cast-popup-id").innerText = "Cast : N/A"
}
cast_real_name="N/A"
cast_movie_name="N/A"
vas="N/A"
}
counter_cast=0
    var f=document.getElementsByClassName("review-text-wrapper")
    for (let i = 1;i < 6;i++)
    {

        
    var node = document.createElement("div")
    node.className = "reviews-text"

    if (i == 1 && !pop_up_data["results"][0]["reviews"][i-1])
        {
            node.innerHTML = '<p class = "reviews-text-matter"><strong> N/A </strong></p>'
        }
    
    if (pop_up_data["results"][0]["reviews"][i-1]){
    if (pop_up_data["results"][0]["reviews"][i-1][2] != null)
    {
    rating = pop_up_data["results"][0]["reviews"][i-1][2] / 2
    node.innerHTML = '<p class="reviews-text-matter"><strong>'+ pop_up_data["results"][0]["reviews"][i-1][0]+ '</strong>&nbsp;on &nbsp;'+pop_up_data["results"][0]["reviews"][i-1][3]+"</p>"+
    '<p class="reviews-text-matter"style="margin-top:20px;"> <span style="color:#a6241c">&#9733; ' + rating  + '/5 &nbsp </span> </p>'+
    '<p class="reviews-text-matter">' + pop_up_data["results"][0]["reviews"][i-1][1] + '</p><hr class = "line">'
    }

    else{
        node.innerHTML = '<p class="reviews-text-matter"><strong>'+ pop_up_data["results"][0]["reviews"][i-1][0]+ '</strong>&nbsp;on &nbsp;'+pop_up_data["results"][0]["reviews"][i-1][3]+"</p>"+
        '<p class="reviews-text-matter" style="margin-top:20px;">' + pop_up_data["results"][0]["reviews"][i-1][1] + '</p><hr <hr class = "line">'

    }}
    f[0].appendChild(node)

    }

    

}



function deletecontainers()
{
   var divsToRemove = document.getElementsByClassName("results")
   for (var i = divsToRemove.length-1; i >= 0; i--) {
       divsToRemove[i].innerHTML=""
       divsToRemove[i].remove()
   }
   document.getElementsByClassName("heading-results")[0].innerHTML=""
   document.getElementsByClassName("heading-results")[0].remove()
   if (no_result==true){
    document.getElementsByClassName("No-heading-results")[0].innerHTML=""
    document.getElementsByClassName("No-heading-results")[0].remove()
    no_result=false  
}
   search_state=false
  
}
function popup_delete()
{ 
    var divsToRemove = document.getElementsByClassName("reviews-text")
    for (var ins = divsToRemove.length-1; ins >= 0; ins--) {
   divsToRemove[ins].innerHTML=""
   divsToRemove[ins].remove()}
   divsToRemove=document.getElementsByClassName("column")
   for (var ins = divsToRemove.length-1; ins >= 0; ins--) {
    divsToRemove[ins].innerHTML=""
    divsToRemove[ins].remove()}
    document.getElementById("cast-popup-id").innerText="Cast"

}