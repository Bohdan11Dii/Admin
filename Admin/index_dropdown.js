$(document).ready(function() {
    $('#theSelect').selectmenu();
  });


//#diagram_1

	
const options = {
    container: document.getElementById('myChart'),
    data: [
      { label: 'Display', value: 41.4 },
      { label: 'Paid Search', value: 20.5 },
      { label: 'Organic Search', value: 18.3 },
      { label: 'Referral', value: 7.4 },
      { label: 'Social', value: 2.6 },
      { label: 'Direct', value: 1.9 },
      { label: 'Other', value: 1.3 },
    ],
    series: [
      {
        type: 'pie',
        angleKey: 'value',
        labelKey: 'label',
      },
    ],
  };
  
  agCharts.AgChart.create(options);

//   line chart

(function() {
	"use strict";

	// creazione coordinate per ogni punto rispetto all'area dell'svg
	var _svg = document.getElementById('svg_wrapper'),

		dati = [ ['8 сер', 23], ['15 сер', 45], ['22 сер', 176], ['29 серп', 12], ['5 вер', 25], ['15 вер', 220], ['22 вер', 315], ['30 вер', 9] ],

		chart_padding = 20, // spazio dal bordo dell'elemento svg per evitare che il grafico sia tagliato dai bordi
		padding_asse_y = 40, // padding orizzontale aggiuntivo per lasciare spazio a sinistra dell'asse y
		padding_asse_x = 20, // padding verticale aggiuntivo per lasciare spazio sotto l'asse x

		valore_massimo_asse_y = dati.reduce(function(prev, current) { // valore massimo asse y (secondo valore di ogni coppia)
			  return Math.max(prev, current[1]);
			}, 0),

		punti_asse_x = dati.length - 1,

		stroke_width_assi = 1, // questo valore va aggiunto ad alcune lunghezze per evitare dentellature

		altezza = 400,
		altezza_corretta = altezza - (chart_padding*2) - padding_asse_x,  // larghezza e altezza dell'svg

		base = 600,
		base_corretta = base - (chart_padding*2) - padding_asse_y
	;

	// arrotondamento valore massimo
	// viene portato alla decina/centinaia più vicina per eccesso
	var parametro_arrotondamento = 10;
	if( valore_massimo_asse_y > 100 ) { parametro_arrotondamento = 100; }
	if( valore_massimo_asse_y > 1000 ) { parametro_arrotondamento = 1000; }
	valore_massimo_asse_y = Math.ceil( valore_massimo_asse_y/parametro_arrotondamento )* parametro_arrotondamento;

	// asse y
	var asse_y = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	asse_y.setAttribute("x1", chart_padding + padding_asse_y );
	asse_y.setAttribute("y1", chart_padding );
	asse_y.setAttribute("x2", chart_padding + padding_asse_y );
	asse_y.setAttribute("y2", chart_padding + altezza_corretta );
	asse_y.setAttribute("stroke_width", stroke_width_assi );
	asse_y.setAttribute("class", 'asse' );
	_svg.appendChild( asse_y );

	// asse x
	var asse_x = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	asse_x.setAttribute("x1", chart_padding + padding_asse_y );
	asse_x.setAttribute("y1", chart_padding + altezza_corretta);
	asse_x.setAttribute("x2", chart_padding + padding_asse_y + base_corretta );
	asse_x.setAttribute("y2", chart_padding + altezza_corretta );
	asse_x.setAttribute("stroke_width", stroke_width_assi );
	asse_x.setAttribute("class", 'asse' );
	_svg.appendChild( asse_x );

	// etichette asse y
	var _step = 8,
		_lunghezza_trattino = 5,
		_trattino,
		_etichetta,
		_divider,
		testo_etichetta,
		font_size_etichetta=9,
		valore_step,
		x1_trattino = chart_padding + padding_asse_y - _lunghezza_trattino,
		x2_trattino = chart_padding + padding_asse_y ,
		x_etichetta = chart_padding + padding_asse_y - (_lunghezza_trattino * 2),
		y_etichetta
	;

	for(var i = 0; i <= _step; i++ ) {
		valore_step = (valore_massimo_asse_y / _step) * i;

		y_etichetta = (chart_padding + altezza_corretta) - ((altezza_corretta / _step) * i);

		//trattino
		_trattino= document.createElementNS("http://www.w3.org/2000/svg", 'line');
		_trattino.setAttribute("x1", x1_trattino );
		_trattino.setAttribute("y1", y_etichetta );
		_trattino.setAttribute("x2", x2_trattino + (stroke_width_assi/2));
		_trattino.setAttribute("y2", y_etichetta );
		_trattino.setAttribute("class", 'trattino' );
		_trattino.setAttribute("stroke_width", stroke_width_assi );
		_svg.appendChild( _trattino );

		// etichetta
		_etichetta= document.createElementNS("http://www.w3.org/2000/svg", 'text');
		_etichetta.setAttribute("x", x_etichetta );
		_etichetta.setAttribute("y", y_etichetta + (font_size_etichetta/3));
		_etichetta.setAttribute("class", 'etichetta' );
		testo_etichetta = document.createTextNode(valore_step);
		_etichetta.style.fontSize = font_size_etichetta + 'px';
		_etichetta.appendChild(testo_etichetta);
		_svg.appendChild( _etichetta );

		// linee divisorie
		_divider= document.createElementNS("http://www.w3.org/2000/svg", 'line');
		_divider.setAttribute("x1", chart_padding + padding_asse_y );
		_divider.setAttribute("y1", y_etichetta );
		_divider.setAttribute("x2", chart_padding + padding_asse_y + base_corretta);
		_divider.setAttribute("y2", y_etichetta );
		_divider.setAttribute("class", 'divider' );
		_svg.appendChild( _divider );
	}


	// etichette asse x
	_step = punti_asse_x;

	var y1_trattino = chart_padding + altezza_corretta - _lunghezza_trattino,
		y2_trattino = y1_trattino + (_lunghezza_trattino * 2)
	;

	y_etichetta = y2_trattino + (_lunghezza_trattino * 2);

	for(i = 0; i <= punti_asse_x; i++ ) {
		x_etichetta = chart_padding + padding_asse_y + ((base_corretta/_step) * i);

		_trattino= document.createElementNS("http://www.w3.org/2000/svg", 'line');
		_trattino.setAttribute("x1", x_etichetta );
		_trattino.setAttribute("y1", y1_trattino );
		_trattino.setAttribute("x2", x_etichetta);
		_trattino.setAttribute("y2", y2_trattino );
		_trattino.setAttribute("class", 'trattino' );
		_trattino.setAttribute("stroke_width", stroke_width_assi );
		_svg.appendChild( _trattino );

		// etichetta
		_etichetta= document.createElementNS("http://www.w3.org/2000/svg", 'text');
		_etichetta.setAttribute("x", x_etichetta );
		_etichetta.setAttribute("y", y_etichetta);
		_etichetta.setAttribute("class", 'etichetta middle' );
		testo_etichetta = document.createTextNode(dati[i][0]);
		_etichetta.style.fontSize = font_size_etichetta + 'px';
		_etichetta.appendChild(testo_etichetta);
		_svg.appendChild( _etichetta );

	}


	// costruzione grafico

	var coord = [],
		points =[];


	dati.forEach(function (item, idx) {
		var i = {label: item[0], value: item[1], index: idx};
		i.x = Math.round((base_corretta / punti_asse_x) * idx) + chart_padding + padding_asse_y;
		i.y = Math.round(altezza - ((altezza_corretta * item[1]) / valore_massimo_asse_y)  - chart_padding - padding_asse_x);
		coord.push(i);
		points.push(i.x +',' +i.y);
	});

	var poly = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
	//poly.setAttribute("fill","M 0 0 L 10 10"); //Set path's data
	//poly.style.stroke = "#000"; //Set stroke colour
	//poly.style.strokeWidth = "5px"; //Set stroke width
	poly.setAttribute("points", points.join(' '));
	_svg.appendChild(poly);

	/* alternate method, using a func

		var create_poly = function (_points, _color) {

			var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');

			newElement.setAttribute("points", _points);
			newElement.style.stroke = _color;
			return newElement;
		}
		_svg.appendChild(create_poly(points, "#0074d9"));
	*/


	// points symbols
	coord.forEach(function (item) {
		var _circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
		_circle.setAttribute("cx", item.x);
		_circle.setAttribute("cy", item.y);
		_circle.setAttribute("r", 5);
		_circle.setAttribute("class", 'point_symbol' );

		_svg.appendChild( _circle );
	});



	//console.log(_svg.querySelector('polyline:last-child'));

})();



// sessions
function show(value) {
    document.querySelector(".text-box").value = value;
  }
  
  let dropdown = document.querySelector(".dropdown")
  dropdown.onclick = function() {
      dropdown.classList.toggle("active")
  }
  


// sessions_long_line
  

Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.elements.responsive = true;
Chart.defaults.global.tooltips.xPadding = 10;
Chart.defaults.global.tooltips.yPadding = 10;
Chart.defaults.global.tooltips.titleMarginBottom = 16;
Chart.defaults.global.tooltips.position = 'average';
Chart.defaults.global.tooltips.bodySpacing = 8;

//Individual chart config
var ctx = "myChart_2";
var myChart = new Chart(ctx, {
  type: 'line',
  options: {
    title: {
      display: true,
      text: 'Precision-Recall Curve'
    },
    maintainAspectRatio: false,
    tooltips: {
    //   backgroundColor: 'rgba(69, 82, 94, 0.9)',
    //   mode: 'index',
    //   position: 'nearest'
    }
  },
  data: {
    labels: ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
    datasets: [{
      label: 'Сеанси(Всі користувачі)',
      data: [2, 42, 55, 50, 42, 38, 32, 24, 20, 18, 18],
      borderColor: '#058dc7',
    //   backgroundColor: 'rgba(26, 188, 156, .3)',
      pointBorderColor: "#fff",
      pointBackgroundColor: "#058dc7",
      pointRadius: .5,
      pointHitRadius: 10
    }, {
      label: 'Сеанси(Трафік планшетних і звичайних ПК)',
      data: [2, 20, 30, 35, 45, 53, 77, 89, 40, 39, 0],
      borderColor: '#ed7f18',
    //   backgroundColor: 'rgba(188, 115, 26)',
      pointBorderColor: "#fff",
      pointBackgroundColor: "#ed7f18",
      pointRadius: .5,
      pointHitRadius: 10
    },{
        label: 'Сеанси(Трафік з мобільних)',
        data: [2, 4, 30, 23, 27, 39, 60, 82, 86, 50, 20],
        borderColor: '#50b432',
        // backgroundColor: 'rgba(58, 188, 26)',
        pointBorderColor: "#fff",
        pointBackgroundColor: "#50b432",
        pointRadius: .5,
        pointHitRadius: 10
      },
      {
        label: 'Сеанси(Трафік смартфонів та планшетних ПК)',
        data: [2, 4, 70, 90, 42, 34, 30, 21, 29, 15, 8],
        borderColor: '#af49c5',
        // backgroundColor: 'rgba(155, 89, 182, .3)',
        pointBorderColor: "#fff",
        pointBackgroundColor: "#af49c5",
        pointRadius: .5,
        pointHitRadius: 10
      },]
  }
});


// chart_diagram_footer


function loop(t) {
    requestAnimationFrame(loop);
    updateCharts(Math.floor(t / 16) % 100);
  }
  
  function updateCharts(value) {
    charts.forEach(chart => setChartValue(chart, value));
  }
  
  function setChartValue(chart, value) {
    chart.style.setProperty('--percent', value);
  }
  
  let charts = document.querySelectorAll('.js');
  
  loop();
  
  