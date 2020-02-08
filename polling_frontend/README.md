# project4_frontend

Summary: 

The front end consists of a functional react thatwhich utilizes useEffect and useState hooks to store and control data; the code is written to dynamically render an unknown amount of candidates and polling data onto a Chart.js canvas. 

Control Flow: 

On the initial component mount, a get request is sent to the rails server to retrieve all candidate data. 

This data then gets passed to a prepareData function that assesses the quantity and names of all candidates.

Once evaluated, this information is sent to the state's candidates array property, and a remount is triggered because useEffect is set to monitor a client's candidate and month selection.

On the second component mount, the candidates are already stored in state, and thus their evaluation is ignored due to a conditional statement within the prepareData function.

Instead, all data retrieved on the second remount is passed to the state's data array property, causing future requests to the server to become uneccessary. 

Next, the function evaluates the amount of polling data (by month), and passes the result to state -- though without triggering another remount.

With all the data fully available and quantified, the Chart.js object can be populated and passed to the createChart function.

Conclusively, when a user selects a candidate or polling month, the above data flow is retrigged, though this time down a slightly different path.

The getData function now relies on the state's data property to fetch all information, before passing to it to the prepareData function.

Because this transfer occurs outside of an axios request, a promise is utilized to resolve prepareData before it passes its results to the updateChart function, instead of createChart.

Within updateChart, either chart.update() or chart.destroy() is called to change the canvas, depending on a conditional that checks whether the chart type (bar or line) has changed. 

