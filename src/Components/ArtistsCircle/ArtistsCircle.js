import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

const ArtistsCircle = React.createClass({
  mixins: [
    ReactFauxDOM.mixins.core,
    ReactFauxDOM.mixins.anim
  ],

  getInitialState() {
    return {
      mounted: false,
      mouseOver: false,
      chart: '',
      color: '',
      keywordChanging: false,
    };
  },

  componentWillMount() {
    this.mounted = true;
  },

  componentDidMount() {
    const artistsArray = this.props.artistsArray;
    // this.faux = this.connectFauxDOM('div.renderedD3', 'chart')
    // function removeByIndex(array, index) {
    //   return array.filter(function (el, i) {
    //     return index !== i;
    //   });
    // }

    var diameter = 960,
        radius = diameter / 2,
        innerRadius = radius - 120;

    var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function(d) { return d.size; });

    var bundle = d3.layout.bundle();

    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(.85)
        .radius(function(d) { return d.y; })
        .angle(function(d) { return d.x / 180 * Math.PI; });
    const w = window.innerWidth;
    const h = window.innerHeight;

    const svg = d3.select("#circlechart").append('svg')
      .attr({
        width: w,
        height: h,
      })
      .append("g")
      .attr("transform", "translate(" + (w/2) + "," + 480 + ")");

    // construct circle
    var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

    d3.json("http://localhost:4000/api/documents?year=all&keyword=&searchterm=", function(error, data) {
    // var keywordsArray = {};
    // // loop all documents
    // for (var i = 0; i < data.length; i += 1) {
    //   // loop all keywords
    //   for (var j = 0; j < data[i].keywords.length; j += 1) {
    //     var keyword = data[i].keywords[j]
    //     // increment counter
    //     if (keywordsArray[keyword] === undefined) {
    //       keywordsArray[keyword] = {"name": keyword, "freq": 1, "imports": []};
    //     } else {
    //       keywordsArray[keyword].freq = keywordsArray[keyword].freq += 1;
    //     }
    //     // populate co-occurance array
    //     var otherkeywords = removeByIndex(data[i].keywords, j)
    //     for (var k = 0; k < otherkeywords.length; k += 1) {
    //       if (keywordsArray[keyword].imports.indexOf(otherkeywords[k]) < 0) {
    //         keywordsArray[keyword].imports.push(otherkeywords[k])
    //       }
    //     }
    //   }
    // }
    // console.log(keywordsArray);
    // var convertedArray = [];
    // for (var key in keywordsArray) {
    //   convertedArray.push(keywordsArray[key]);
    // }
    
    //     var artistsArray = {};
    // // loop all documents
    // for (var i = 0; i < data.length; i += 1) {
    //   // loop all keywords
    //   for (var j = 0; j < data[i].artists.length; j += 1) {
    //     var artist = data[i].artists[j]
    //     // increment counter
    //     if (artistsArray[artist] === undefined) {
    //       artistsArray[artist] = {"name": artist, "freq": 1, "imports": []};
    //     } else {
    //       artistsArray[artist].freq = artistsArray[artist].freq += 1;
    //     }
    //     // populate co-occurance array
    //     var otherartists = removeByIndex(data[i].artists, j)
    //     for (var k = 0; k < otherartists.length; k += 1) {
    //       if (artistsArray[artist].imports.indexOf(otherartists[k]) < 0) {
    //         artistsArray[artist].imports.push(otherartists[k])
    //       }
    //     }
    //   }
    // }
    // console.log(artistsArray);
    // var convertedArray = [];
    // for (var key in artistsArray) {
    //   convertedArray.push(artistsArray[key]);
    // }

  var nodes = cluster.nodes(packageHierarchy(artistsArray)),
      links = packageImports(nodes);

  link = link
      .data(bundle(links))
    .enter().append("path")
      .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
      .attr("class", "link")
      .attr("d", line);

  node = node
      .data(nodes.filter(function(n) { return !n.children; }))
      .enter().append("text")
      .attr("class", "node")
      .attr("dy", ".31em")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
      .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .text(function(d) { return d.key; })
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted);
    });

    function mouseovered(d) {
      node
          .each(function(n) { n.target = n.source = false; });

      link
          .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
          .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
        .filter(function(l) { return l.target === d || l.source === d; })
          .each(function() { this.parentNode.appendChild(this); });

      node
          .classed("node--target", function(n) { return n.target; })
          .classed("node--source", function(n) { return n.source; });
    }

    function mouseouted(d) {
      link
          .classed("link--target", false)
          .classed("link--source", false);

      node
          .classed("node--target", false)
          .classed("node--source", false);
    }

    d3.select(self.frameElement).style("height", diameter + "px");

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
      var map = {};

      function find(name, data) {
        var node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach(function(d) {
        find(d.name, d);
      });

      return map[""];
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
      var map = {},
          imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.imports) d.imports.forEach(function(i) {
          imports.push({source: map[d.name], target: map[i]});
        });
      });

      return imports;
    }
  },

  componentWillUnmount() {
    this.mounted = false;
  },

  render() {
    return (
      <div>
        <div id="circlechart">
          {this.state.chart}
        </div>
      </div>
    )
  }
})

export default ArtistsCircle;
