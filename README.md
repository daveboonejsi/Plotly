# Plotly
plotly_deployment


# Objectives
The goals of this challenge was to:

Edit the plots.js and index.html files to create a dynamic webpage with charts in which the selection of volunteer ID number updates graphics for data pertaining to that volunteer.  For testing perposes I created a local server to get around COR restrictions (related to internet security).
1. Create a demographic information panel which shows for each volunteer (unique sample id) the ethnicity, gender, age, location, bbtype and washing frequency per week.  In the 
   samples.json datafile these data are stored in an array called metadata and there is one value per key, per volunteer.  The sample data are stored in another array where there    can be many samples with associated sample_ids and labels, per volunteer.
2. Create a bar chart of the top ten bacterial species in a volunteer’s navel. I used JavaScript to slice the array and select only the most populous species (sample_value).
3. Create a bubble chart to visualize the relative frequency of all the bacterial species found in a volunteer’s navel.  The bubble chart shows bubbles for which the size of the bubble is given by the sample_value, so the more prevalent bacteria are represented by the largest bubbles.  Also, the height of the bubble is an indicator of the relative prevalence.  
4. Create a gauge chart to show the relative frequency of washing per week for each volunteer.
5. I then deployed the app to a free static page hosting service (GitHub) which provides the server and anyone visiting the webpage can manipulate the graphics with the selection of the volunteer id.

URL for Git Page
https://daveboonejsi.github.io/Plotly/

Thanks!
