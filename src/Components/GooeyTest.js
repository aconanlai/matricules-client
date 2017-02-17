import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import styled, { keyframes } from 'styled-components';

const GooeyTest = React.createClass({
  mixins: [
    ReactFauxDOM.mixins.core,
    ReactFauxDOM.mixins.anim,
  ],

  getInitialState() {
    return {
      mounted: false,
      chart: '',
    };
  },

  componentDidMount() {
    const dataum = [
      {
        "city": "Tokyo–Yokohama",
        "country": "Japan",
        "population": 37843000,
        "latitude": 35.4437078,
        "longitude": 139.6380256
      },
      {
        "city": "Jakarta",
        "country": "Indonesia",
        "population": 30539000,
        "latitude": -6.2087634,
        "longitude": 106.845599
      },
      {
        "city": "Delhi",
        "country": "India",
        "population": 24998000,
        "latitude": 28.6139391,
        "longitude": 77.2090212
      },
      {
        "city": "Manila",
        "country": "Other",
        "population": 24123000,
        "latitude": 14.5995124,
        "longitude": 120.9842195
      },
      {
        "city": "Seoul–Gyeonggi–Incheon",
        "country": "Other",
        "population": 23480000,
        "latitude": 37.4562557,
        "longitude": 126.7052062
      },
      {
        "city": "Shanghai",
        "country": "China",
        "population": 23416000,
        "latitude": 31.230416,
        "longitude": 121.473701
      },
      {
        "city": "Karachi",
        "country": "Pakistan",
        "population": 22123000,
        "latitude": 24.8614622,
        "longitude": 67.0099388
      },
      {
        "city": "Beijing",
        "country": "China",
        "population": 21009000,
        "latitude": 39.904211,
        "longitude": 116.407395
      },
      {
        "city": "New York City",
        "country": "United States",
        "population": 20630000,
        "latitude": 40.7127837,
        "longitude": -74.0059413
      },
      {
        "city": "Guangzhou–Foshan",
        "country": "China",
        "population": 20597000,
        "latitude": 23.0402798,
        "longitude": 113.1018582
      },
      {
        "city": "São Paulo",
        "country": "Brazil",
        "population": 20365000,
        "latitude": -23.5505199,
        "longitude": -46.6333094
      },
      {
        "city": "Mexico City",
        "country": "Mexico",
        "population": 20063000,
        "latitude": 19.4326077,
        "longitude": -99.133208
      },
      {
        "city": "Mumbai",
        "country": "India",
        "population": 17712000,
        "latitude": 19.0759837,
        "longitude": 72.8776559
      },
      {
        "city": "Osaka–Kobe–Kyoto",
        "country": "Japan",
        "population": 17444000,
        "latitude": 35.0116363,
        "longitude": 135.7680294
      },
      {
        "city": "Moscow",
        "country": "Other",
        "population": 16170000,
        "latitude": 55.755826,
        "longitude": 37.6173
      },
      {
        "city": "Dhaka",
        "country": "Other",
        "population": 15669000,
        "latitude": 23.810332,
        "longitude": 90.4125181
      },
      {
        "city": "Greater Cairo",
        "country": "Other",
        "population": 15600000,
        "latitude": 30.0444196,
        "longitude": 31.2357116
      },
      {
        "city": "Los Angeles",
        "country": "United States",
        "population": 15058000,
        "latitude": 34.0522342,
        "longitude": -118.2436849
      },
      {
        "city": "Bangkok",
        "country": "Other",
        "population": 14998000,
        "latitude": 13.7563309,
        "longitude": 100.5017651
      },
      {
        "city": "Kolkata",
        "country": "India",
        "population": 14667000,
        "latitude": 22.572646,
        "longitude": 88.363895
      },
      {
        "city": "Buenos Aires",
        "country": "Other",
        "population": 14122000,
        "latitude": -34.6036844,
        "longitude": -58.3815591
      },
      {
        "city": "Tehran",
        "country": "Other",
        "population": 13532000,
        "latitude": 35.6891975,
        "longitude": 51.3889736
      },
      {
        "city": "Istanbul",
        "country": "Turkey",
        "population": 13287000,
        "latitude": 41.0082376,
        "longitude": 28.9783589
      },
      {
        "city": "Lagos",
        "country": "Other",
        "population": 13123000,
        "latitude": 6.5243793,
        "longitude": 3.3792057
      },
      {
        "city": "Shenzhen",
        "country": "China",
        "population": 12084000,
        "latitude": 22.543096,
        "longitude": 114.057865
      },
      {
        "city": "Rio de Janeiro",
        "country": "Brazil",
        "population": 11727000,
        "latitude": -22.9068467,
        "longitude": -43.1728965
      },
      {
        "city": "Kinshasa",
        "country": "Other",
        "population": 11587000,
        "latitude": -4.4419311,
        "longitude": 15.2662931
      },
      {
        "city": "Tianjin",
        "country": "China",
        "population": 10920000,
        "latitude": 39.084158,
        "longitude": 117.200983
      },
      {
        "city": "Paris",
        "country": "Other",
        "population": 10858000,
        "latitude": 48.856614,
        "longitude": 2.3522219
      },
      {
        "city": "Lima",
        "country": "Other",
        "population": 10750000,
        "latitude": -12.046374,
        "longitude": -77.0427934
      },
      {
        "city": "Chengdu",
        "country": "China",
        "population": 10376000,
        "latitude": 30.572816,
        "longitude": 104.066801
      },
      {
        "city": "London",
        "country": "Other",
        "population": 10236000,
        "latitude": 51.5073509,
        "longitude": -0.1277583
      },
      {
        "city": "Nagoya",
        "country": "Japan",
        "population": 10177000,
        "latitude": 35.1814464,
        "longitude": 136.906398
      },
      {
        "city": "Lahore",
        "country": "Pakistan",
        "population": 10052000,
        "latitude": 31.5546061,
        "longitude": 74.3571581
      },
      {
        "city": "Chennai",
        "country": "India",
        "population": 9714000,
        "latitude": 13.0826802,
        "longitude": 80.2707184
      },
      {
        "city": "Chicago",
        "country": "United States",
        "population": 9156000,
        "latitude": 41.8781136,
        "longitude": -87.6297982
      },
      {
        "city": "Bogotá",
        "country": "Other",
        "population": 8991000,
        "latitude": 4.7109886,
        "longitude": -74.072092
      },
      {
        "city": "Ho Chi Minh City",
        "country": "Other",
        "population": 8957000,
        "latitude": 10.8230989,
        "longitude": 106.6296638
      },
      {
        "city": "Hyderabad",
        "country": "India",
        "population": 8754000,
        "latitude": 17.385044,
        "longitude": 78.486671
      },
      {
        "city": "Bengaluru",
        "country": "India",
        "population": 8728906,
        "latitude": 12.9715987,
        "longitude": 77.5945627
      },
      {
        "city": "Dongguan",
        "country": "China",
        "population": 8442000,
        "latitude": 23.020673,
        "longitude": 113.7518
      },
      {
        "city": "Johannesburg–East Rand",
        "country": "South Africa",
        "population": 8432000,
        "latitude": -26.2041028,
        "longitude": 28.0473051
      },
      {
        "city": "Wuhan",
        "country": "China",
        "population": 7509000,
        "latitude": 30.593099,
        "longitude": 114.305393
      },
      {
        "city": "Taipei",
        "country": "Other",
        "population": 7438000,
        "latitude": 25.0329694,
        "longitude": 121.5654177
      },
      {
        "city": "Hangzhou",
        "country": "China",
        "population": 7275000,
        "latitude": 30.274085,
        "longitude": 120.15507
      },
      {
        "city": "Hong Kong",
        "country": "China",
        "population": 7246000,
        "latitude": 22.396428,
        "longitude": 114.109497
      },
      {
        "city": "Chongqing",
        "country": "China",
        "population": 7217000,
        "latitude": 29.56301,
        "longitude": 106.551556
      },
      {
        "city": "Ahmedabad",
        "country": "India",
        "population": 7186000,
        "latitude": 23.022505,
        "longitude": 72.5713621
      },
      {
        "city": "Kuala Lumpur",
        "country": "Other",
        "population": 7088000,
        "latitude": 3.139003,
        "longitude": 101.686855
      },
      {
        "city": "Quanzhou",
        "country": "China",
        "population": 6710000,
        "latitude": 24.874132,
        "longitude": 118.675676
      },
      {
        "city": "Essen–Düsseldorf",
        "country": "Other",
        "population": 6679000,
        "latitude": 51.4556432,
        "longitude": 7.0115552
      },
      {
        "city": "Baghdad",
        "country": "Other",
        "population": 6625000,
        "latitude": 33.3128057,
        "longitude": 44.3614875
      },
      {
        "city": "Toronto",
        "country": "Other",
        "population": 6456000,
        "latitude": 43.653226,
        "longitude": -79.3831843
      },
      {
        "city": "Santiago",
        "country": "Other",
        "population": 6225000,
        "latitude": -33.4488897,
        "longitude": -70.6692655
      },
      {
        "city": "Dallas–Fort Worth",
        "country": "United States",
        "population": 6174000,
        "latitude": 32.7554883,
        "longitude": -97.3307658
      },
      {
        "city": "Madrid",
        "country": "Other",
        "population": 6171000,
        "latitude": 40.4167754,
        "longitude": -3.7037902
      },
      {
        "city": "Nanjing",
        "country": "China",
        "population": 6155000,
        "latitude": 32.060255,
        "longitude": 118.796877
      },
      {
        "city": "Shenyang",
        "country": "China",
        "population": 6078000,
        "latitude": 41.805699,
        "longitude": 123.431472
      },
      {
        "city": "Xi'an–Xianyang",
        "country": "China",
        "population": 5977000,
        "latitude": 34.3243211,
        "longitude": 108.7051235
      },
      {
        "city": "San Francisco–San Jose",
        "country": "United States",
        "population": 5929000,
        "latitude": 37.7299514,
        "longitude": -122.4384735
      },
      {
        "city": "Luanda",
        "country": "Other",
        "population": 5899000,
        "latitude": -8.8399876,
        "longitude": 13.2894368
      },
      {
        "city": "Qingdao–Jimo",
        "country": "China",
        "population": 5816000,
        "latitude": 36.389402,
        "longitude": 120.447161
      },
      {
        "city": "Houston",
        "country": "United States",
        "population": 5764000,
        "latitude": 29.7604267,
        "longitude": -95.3698028
      },
      {
        "city": "Miami",
        "country": "United States",
        "population": 5764000,
        "latitude": 25.7616798,
        "longitude": -80.1917902
      },
      {
        "city": "Bandung",
        "country": "Indonesia",
        "population": 5695000,
        "latitude": -6.9174639,
        "longitude": 107.6191228
      },
      {
        "city": "Riyadh",
        "country": "Other",
        "population": 5666000,
        "latitude": 24.7135517,
        "longitude": 46.6752957
      },
      {
        "city": "Pune",
        "country": "India",
        "population": 5631000,
        "latitude": 18.5204303,
        "longitude": 73.8567437
      },
      {
        "city": "Singapore",
        "country": "Other",
        "population": 5624000,
        "latitude": 1.3553794,
        "longitude": 103.8677444
      },
      {
        "city": "Philadelphia",
        "country": "United States",
        "population": 5570000,
        "latitude": 39.9525839,
        "longitude": -75.1652215
      },
      {
        "city": "Surat",
        "country": "India",
        "population": 5447000,
        "latitude": 21.1702401,
        "longitude": 72.8310607
      },
      {
        "city": "Milan",
        "country": "Italy",
        "population": 5257000,
        "latitude": 45.4654219,
        "longitude": 9.1859243
      },
      {
        "city": "Suzhou",
        "country": "China",
        "population": 5246000,
        "latitude": 31.298979,
        "longitude": 120.58529
      },
      {
        "city": "Saint Petersburg",
        "country": "Other",
        "population": 5126000,
        "latitude": 59.9342802,
        "longitude": 30.3350986
      },
      {
        "city": "Khartoum",
        "country": "Other",
        "population": 5125000,
        "latitude": 15.5006544,
        "longitude": 32.5598994
      },
      {
        "city": "Atlanta",
        "country": "United States",
        "population": 5015000,
        "latitude": 33.7489954,
        "longitude": -84.3879824
      },
      {
        "city": "Zhengzhou–Xingyang",
        "country": "China",
        "population": 4942000,
        "latitude": 34.787375,
        "longitude": 113.383221
      },
      {
        "city": "Washington, D.C.",
        "country": "United States",
        "population": 4889000,
        "latitude": 38.9071923,
        "longitude": -77.0368707
      },
      {
        "city": "Surabaya",
        "country": "Indonesia",
        "population": 4881000,
        "latitude": -7.2574719,
        "longitude": 112.7520883
      },
      {
        "city": "Harbin",
        "country": "China",
        "population": 4815000,
        "latitude": 45.803775,
        "longitude": 126.534967
      },
      {
        "city": "Abidjan",
        "country": "Other",
        "population": 4800000,
        "latitude": 5.3599517,
        "longitude": -4.0082563
      },
      {
        "city": "Yangon",
        "country": "Other",
        "population": 4800000,
        "latitude": 16.8660694,
        "longitude": 96.195132
      },
      {
        "city": "Nairobi",
        "country": "Other",
        "population": 4738000,
        "latitude": -1.2920659,
        "longitude": 36.8219462
      },
      {
        "city": "Barcelona",
        "country": "Other",
        "population": 4693000,
        "latitude": 41.3850639,
        "longitude": 2.1734035
      },
      {
        "city": "Alexandria",
        "country": "Other",
        "population": 4689000,
        "latitude": 31.2000924,
        "longitude": 29.9187387
      },
      {
        "city": "Kabul",
        "country": "Other",
        "population": 4635000,
        "latitude": 34.5553494,
        "longitude": 69.207486
      },
      {
        "city": "Guadalajara",
        "country": "Mexico",
        "population": 4603000,
        "latitude": 20.6596988,
        "longitude": -103.3496092
      },
      {
        "city": "Ankara",
        "country": "Turkey",
        "population": 4538000,
        "latitude": 39.9333635,
        "longitude": 32.8597419
      },
      {
        "city": "Belo Horizonte",
        "country": "Brazil",
        "population": 4517000,
        "latitude": -19.9166813,
        "longitude": -43.9344931
      },
      {
        "city": "Boston",
        "country": "United States",
        "population": 4478000,
        "latitude": 42.3600825,
        "longitude": -71.0588801
      },
      {
        "city": "Xiamen",
        "country": "China",
        "population": 4420000,
        "latitude": 24.479834,
        "longitude": 118.089425
      },
      {
        "city": "Kuwait City",
        "country": "Other",
        "population": 4283000,
        "latitude": 29.375859,
        "longitude": 47.9774052
      },
      {
        "city": "Dar es Salaam",
        "country": "Other",
        "population": 4219000,
        "latitude": -6.792354,
        "longitude": 39.2083284
      },
      {
        "city": "Phoenix",
        "country": "United States",
        "population": 4194000,
        "latitude": 33.4483771,
        "longitude": -112.0740373
      },
      {
        "city": "Dalian",
        "country": "China",
        "population": 4183000,
        "latitude": 38.914003,
        "longitude": 121.614682
      },
      {
        "city": "Accra",
        "country": "Other",
        "population": 4145000,
        "latitude": 5.6037168,
        "longitude": -0.1869644
      },
      {
        "city": "Monterrey",
        "country": "Mexico",
        "population": 4083000,
        "latitude": 25.6866142,
        "longitude": -100.3161126
      },
      {
        "city": "Berlin",
        "country": "Other",
        "population": 4069000,
        "latitude": 52.5200066,
        "longitude": 13.404954
      },
      {
        "city": "Sydney",
        "country": "Other",
        "population": 4036000,
        "latitude": -33.8674869,
        "longitude": 151.2069902
      },
      {
        "city": "Fuzhou",
        "country": "China",
        "population": 3962000,
        "latitude": 26.074508,
        "longitude": 119.296494
      },
      {
        "city": "Medan",
        "country": "Indonesia",
        "population": 3942000,
        "latitude": 3.5951956,
        "longitude": 98.6722227
      },
      {
        "city": "Dubai",
        "country": "Other",
        "population": 3933000,
        "latitude": 25.2048493,
        "longitude": 55.2707828
      },
      {
        "city": "Melbourne",
        "country": "Other",
        "population": 3906000,
        "latitude": -37.814107,
        "longitude": 144.96328
      },
      {
        "city": "Rome",
        "country": "Italy",
        "population": 3906000,
        "latitude": 41.9027835,
        "longitude": 12.4963655
      },
      {
        "city": "Busan",
        "country": "Other",
        "population": 3906000,
        "latitude": 35.1795543,
        "longitude": 129.0756416
      },
      {
        "city": "Cape Town",
        "country": "South Africa",
        "population": 3812000,
        "latitude": -33.9248685,
        "longitude": 18.4240553
      },
      {
        "city": "Jinan",
        "country": "China",
        "population": 3789000,
        "latitude": 36.651216,
        "longitude": 117.12
      },
      {
        "city": "Ningbo",
        "country": "China",
        "population": 3753000,
        "latitude": 29.868336,
        "longitude": 121.54399
      },
      {
        "city": "Hanoi",
        "country": "Other",
        "population": 3715000,
        "latitude": 21.0277644,
        "longitude": 105.8341598
      },
      {
        "city": "Naples",
        "country": "Italy",
        "population": 3706000,
        "latitude": 40.8517746,
        "longitude": 14.2681244
      },
      {
        "city": "Taiyuan—Yuci",
        "country": "China",
        "population": 3702000,
        "latitude": 37.697792,
        "longitude": 112.708241
      },
      {
        "city": "Jeddah",
        "country": "Other",
        "population": 3677000,
        "latitude": 21.2854067,
        "longitude": 39.2375507
      },
      {
        "city": "Detroit",
        "country": "United States",
        "population": 3672000,
        "latitude": 42.331427,
        "longitude": -83.0457538
      },
      {
        "city": "Hefei",
        "country": "China",
        "population": 3665000,
        "latitude": 31.820592,
        "longitude": 117.227219
      },
      {
        "city": "Changsha",
        "country": "China",
        "population": 3657000,
        "latitude": 28.228209,
        "longitude": 112.938814
      },
      {
        "city": "Kunming–Anning",
        "country": "China",
        "population": 3649000,
        "latitude": 24.919493,
        "longitude": 102.478494
      },
      {
        "city": "Wuxi",
        "country": "China",
        "population": 3597000,
        "latitude": 31.49117,
        "longitude": 120.31191
      },
      {
        "city": "Medellín",
        "country": "Other",
        "population": 3568000,
        "latitude": 6.2530408,
        "longitude": -75.5645737
      },
      {
        "city": "Faisalabad",
        "country": "Pakistan",
        "population": 3560000,
        "latitude": 31.4187142,
        "longitude": 73.0791073
      },
      {
        "city": "Aleppo",
        "country": "Other",
        "population": 3560000,
        "latitude": 36.2021047,
        "longitude": 37.1342603
      },
      {
        "city": "Kano",
        "country": "Other",
        "population": 3550000,
        "latitude": 12.0021794,
        "longitude": 8.5919561
      },
      {
        "city": "Montreal",
        "country": "Other",
        "population": 3407963,
        "latitude": 45.5016889,
        "longitude": -73.567256
      },
      {
        "city": "Dakar",
        "country": "Other",
        "population": 3520000,
        "latitude": 14.7645042,
        "longitude": -17.3660286
      },
      {
        "city": "Athens",
        "country": "Other",
        "population": 3484000,
        "latitude": 37.983917,
        "longitude": 23.7293599
      },
      {
        "city": "Changzhou",
        "country": "China",
        "population": 3425000,
        "latitude": 31.811226,
        "longitude": 119.974062
      },
      {
        "city": "Durban",
        "country": "South Africa",
        "population": 3421000,
        "latitude": -29.8586804,
        "longitude": 31.0218404
      },
      {
        "city": "Porto Alegre",
        "country": "Brazil",
        "population": 3413000,
        "latitude": -30.0346471,
        "longitude": -51.2176584
      },
      {
        "city": "Jaipur",
        "country": "India",
        "population": 3409000,
        "latitude": 26.9124336,
        "longitude": 75.7872709
      },
      {
        "city": "Fortaleza",
        "country": "Brazil",
        "population": 3401000,
        "latitude": -3.7318616,
        "longitude": -38.5266704
      },
      {
        "city": "Addis Ababa",
        "country": "Other",
        "population": 3376000,
        "latitude": 8.9806034,
        "longitude": 38.7577605
      },
      {
        "city": "Changchun",
        "country": "China",
        "population": 3368000,
        "latitude": 43.817072,
        "longitude": 125.323544
      },
      {
        "city": "Shijiazhuang",
        "country": "China",
        "population": 3367000,
        "latitude": 38.042307,
        "longitude": 114.51486
      },
      {
        "city": "Recife",
        "country": "Brazil",
        "population": 3347000,
        "latitude": -8.0578381,
        "longitude": -34.8828969
      },
      {
        "city": "Mashhad",
        "country": "Other",
        "population": 3294000,
        "latitude": 36.2604623,
        "longitude": 59.6167549
      },
      {
        "city": "Seattle",
        "country": "United States",
        "population": 3218000,
        "latitude": 47.6062095,
        "longitude": -122.3320708
      },
      {
        "city": "Casablanca",
        "country": "Other",
        "population": 3211000,
        "latitude": 33.5731104,
        "longitude": -7.5898434
      },
      {
        "city": "Salvador",
        "country": "Brazil",
        "population": 3190000,
        "latitude": -12.9730401,
        "longitude": -38.502304
      },
      {
        "city": "Ürümqi",
        "country": "China",
        "population": 3184000,
        "latitude": 43.825592,
        "longitude": 87.616848
      },
      {
        "city": "Lucknow",
        "country": "India",
        "population": 3184000,
        "latitude": 26.8466937,
        "longitude": 80.946166
      },
      {
        "city": "Chittagong",
        "country": "Other",
        "population": 3176000,
        "latitude": 22.3475365,
        "longitude": 91.8123324
      },
      {
        "city": "Wenzhou",
        "country": "China",
        "population": 3169000,
        "latitude": 27.993828,
        "longitude": 120.699362
      },
      {
        "city": "Ibadan",
        "country": "Other",
        "population": 3160000,
        "latitude": 7.3775355,
        "longitude": 3.9470396
      },
      {
        "city": "İzmir",
        "country": "Turkey",
        "population": 3112000,
        "latitude": 38.423734,
        "longitude": 27.142826
      },
      {
        "city": "Curitiba",
        "country": "Brazil",
        "population": 3102000,
        "latitude": -25.4289541,
        "longitude": -49.267137
      },
      {
        "city": "San Diego",
        "country": "United States",
        "population": 3086000,
        "latitude": 32.715738,
        "longitude": -117.1610838
      },
      {
        "city": "Yaoundé",
        "country": "Other",
        "population": 3060000,
        "latitude": 3.8480325,
        "longitude": 11.5020752
      },
      {
        "city": "Zhangjiagang–Jiangyin–Jingjiang",
        "country": "China",
        "population": 3056000,
        "latitude": 31.8377775,
        "longitude": 120.3152942
      },
      {
        "city": "Kanpur",
        "country": "India",
        "population": 3037000,
        "latitude": 26.449923,
        "longitude": 80.3318736
      },
      {
        "city": "Zhongshan",
        "country": "China",
        "population": 3031000,
        "latitude": 22.516999,
        "longitude": 113.392725
      }
    ]

    ///////////////////////////////////////////////////////////////////////////
    //////////////////// Set up and initiate svg containers ///////////////////
    ///////////////////////////////////////////////////////////////////////////	

    const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    //SVG container
    const svg = d3.select('#renderedD3')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + (margin.left) + ',' + (margin.top) + ')');

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////// Create filter ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////	

    //SVG filter for the gooey effect
    //Code taken from http://tympanus.net/codrops/2015/03/10/creative-gooey-effects/
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'gooeyCodeFilter');
    filter.append('feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', '10')
      //to fix safari: http://stackoverflow.com/questions/24295043/svg-gaussian-blur-in-safari-unexpectedly-lightens-image
      .attr('color-interpolation-filters', 'sRGB')
      .attr('result', 'blur');
    filter.append('feColorMatrix')
      .attr('class', 'blurValues')
      .attr('in', 'blur')
      .attr('mode', 'matrix')
      .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5')
      .attr('result', 'gooey');
    filter.append('feBlend')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'gooey')
      .attr('operator', 'atop');

    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////////// Blobs ///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////// 

    const centerx = window.innerWidth / 2;
    const centery = window.innerHeight / 2;

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const randocolor = getRandomColor();

    //Radius scale

    const rScale = d3.scale.sqrt()
      .range([0, 34])
      .domain([0, d3.max(dataum, function (d) { return d.population; })]);

    //Put the city locations into the data itself
    dataum.forEach(function (d, i) {
      d.radius = rScale(d.population);
      d.x = Math.round(Math.random()) * 2000 - 1000;
      d.y = Math.round(Math.random()) * 2000 - 1000;
    });

    // Wrapper
    const cityWrapper = svg.append('g')
      .attr('class', 'cityWrapper')
      .style('filter', 'url(#gooeyCodeFilter)')
      .attr('fill', randocolor);

    //Place the blobs
    const blobs = cityWrapper.selectAll('.blobs')
      .data(dataum)
      .enter().append('circle')
      .attr('class', 'blobs')
      .attr('r', function (d) { return d.radius; })
      .attr('cx', centerx)
      .attr('cy', centery)
      .style('opacity', 1)
      .attr('fill', randocolor);

    const coverCircleRadius = 100;
    //Circle over all others
    cityWrapper.append('circle')
      .attr('class', 'blobCover')
      .attr('r', coverCircleRadius)
      .attr('cx', centerx)
      .attr('cy', centery);


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////// Do the loop /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////	


    loop();
    setInterval(loop, 12000);

    function loop() {
      placeBlobs();
      // setTimeout(clusterCountry, 7000);
      setTimeout(backToCenter, 6000);
    }

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////// Animation steps ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////	

    //Move the blobs from the center to their actual locations
    function placeBlobs(component) {
      //Make the cover circle shrink
      d3.selectAll('.blobCover')
        .transition().duration(5000)
        .attr('r', 0);

      // place blobs
      d3.selectAll('.blobs')
        .transition('move').duration(2000)
        // .delay(function(d,i) { return i*20; })
        .attr('r', function (d) {
          return d.radius = rScale(d.population);
        })
        .attr('cx', function (d) {
          return d.x = Math.floor((Math.random() * window.innerWidth) + 1);
        })
        .attr('cy', function (d) {
          return d.y = Math.floor((Math.random() * window.innerHeight) + 1);
        });


      //'Remove' gooey filter during the transition
      //So at the end they do not appear to melt together anymore
      d3.selectAll('.blurValues')
        .transition().duration(4000)
        .attrTween('values', function () {
          return d3.interpolateString('1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5',
            '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -5');
        });
    }

    //Move the circles back to the center location again
    function backToCenter() {

      //Hide labels
      d3.selectAll('.label')
        .transition().duration(500)
        .style('opacity', 0);

      //Show map
      // d3.selectAll('.geo-path')
      // 	.transition().duration(1000)
      // 	.style('fill-opacity', 0.5);

      //Make the cover cirlce to its true size again
      d3.selectAll('.blobCover')
        .transition().duration(3000).delay(500)
        .attr('r', coverCircleRadius);

      //Move the blobs to the center
      d3.selectAll('.blobs')
        .transition()
        .duration(2000).delay(function (d, i) { return i * 10; })
        .attr('cx', centerx)
        .attr('cy', centery)
        .style('opacity', 1);

      d3.selectAll('.blurValues')
        .transition().duration(1000).delay(1000)
        .attrTween('values', function () {
          return d3.interpolateString('1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -6',
            '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5');
        });

    }

  },

  render() {
    return (
      <div>
        <div id='renderedD3'>
        </div>
      </div>
    )
  }
})

export default GooeyTest;