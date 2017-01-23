var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";


var margin = 70,
  h = 900,
  w = 1000;


var svg = d3.select("body").append("svg").attr("width", w).attr("height", h).append("g").attr("transform",
 `translate(${margin}, 0)`);

//var color = d3.scaleOrdinal(d3.schemeCategory10);

d3.json(url, function(data) {

var tip = d3.tip().attr('class', 'd3-tip').html(function(d){
return d.country

})






  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink()
           .id(function(d) {return d.index; }).distance(50).strength(2))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(w / 2, h / 2))
    .force("collide", d3.forceCollide(10).radius(25))
    .force("y", d3.forceY(5))
    .force("x", d3.forceX(5))


  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line").data(data.links).enter()
    .append("line")
    .attr("stroke", "black")
    .attr("stroke-width", 1) ;




var node = svg.selectAll("image")
              .data(data.nodes)
              .enter().append("image")
              .attr("xlink:href", function(d){
                      if(d.code === "xk" || d.code=== "ir"){return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3/tl.svg`}

                return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3/${d.code}.svg`})
                .attr("y", -20)
                .attr("x", -20)
                .call(d3.drag()
                  .on("start", dragstarted)
                  .on("drag", dragged)
                  .on("end", dragended))
                  .on('mouseover', tip.show)
 .on('mouseout', tip.hide);

node.call(tip);



  var ticked = function() {
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    node
      .attr("x", function(d) {
        return d.x -10;
      })
      .attr("y", function(d) {
        return d.y -10;
      });
  };

  simulation
    .nodes(data.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(data.links);

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

});
