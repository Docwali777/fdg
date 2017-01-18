var url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json"

var margin = 70,
h = 400,
w = 700;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h).append("g").attr("transform", `translate(${margin},${margin})`)

d3.json(url , function(data){

  var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function(d){return d.index}))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(w/2, h/2))
  .force("y", d3.forceY(1))
  .force("x", d3.forceX(1))

  var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line").data(data.links).enter()
        .append("line")
        .attr("stroke", "black")

  var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data.nodes).enter().append("circle")
        .attr("r", 5)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))

            var ticked = function() {
                      link
                          .attr("x1", function(d) { return d.source.x; })
                          .attr("y1", function(d) { return d.source.y; })
                          .attr("x2", function(d) { return d.target.x; })
                          .attr("y2", function(d) { return d.target.y; });

                      node
                          .attr("cx", function(d) { return d.x; })
                          .attr("cy", function(d) { return d.y; });
                  }

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









})
