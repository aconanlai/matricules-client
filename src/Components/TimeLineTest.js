import React, { Component } from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import * as d3 from 'd3';

require('smoothscroll-polyfill').polyfill();

const YearDisplay = styled.span`
  position: fixed;
  text-align: center;
  top: 0;
  font-size: 80px;
`;

const Year2016 = styled.div`
  width: 100%;
  height: 200vh;
  padding-top: 100vh;
  background: yellow;
`;

const Year2015 = styled.div`
  width: 100%;
  height: 200vh;
  padding-top: 100vh;
  background: pink;
`;

const Year2014 = styled.div`
  width: 100%;
  height: 200vh;
  padding-top: 100vh;
  background: coral;
`;

const Year2013 = styled.div`
  width: 100%;
  height: 200vh;
  padding-top: 100vh;
  background: limegreen;
`;

const Select = styled.select`
    position: fixed;
    top: 0;
    right: 0;    
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      mounted: false,
      chart: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleWaypointLeave = this.handleWaypointLeave.bind(this);
    this.backToCenter = this.backToCenter.bind(this);
    this.placeBlobs = this.placeBlobs.bind(this);
    this.rScale = this.rScale.bind(this);
    this.centerx = window.innerWidth / 2;
    this.centery = window.innerHeight / 2;
    this.coverCircleRadius = 60;
    this.dataum = [
      {
        "_id": "58ab436ad3ec4898e86298a1",
        "keyword": "Kerri",
        "occurance": 118
      },
      {
        "_id": "58ab436ab81e7c9fc99fc52d",
        "keyword": "Maryellen",
        "occurance": 100
      },
      {
        "_id": "58ab436a40b68506aac5d8c5",
        "keyword": "Sutton",
        "occurance": 31
      },
      {
        "_id": "58ab436a8075501603df182d",
        "keyword": "Lillian",
        "occurance": 121
      },
      {
        "_id": "58ab436ad049c41521de91d5",
        "keyword": "Finley",
        "occurance": 131
      },
      {
        "_id": "58ab436a087a02d55fdafd75",
        "keyword": "Ruthie",
        "occurance": 99
      },
      {
        "_id": "58ab436a5fc18e0131594178",
        "keyword": "Dorothy",
        "occurance": 108
      },
      {
        "_id": "58ab436a9173084f9fe4bb0b",
        "keyword": "Hendrix",
        "occurance": 63
      },
      {
        "_id": "58ab436aa8b6a18dd01551fb",
        "keyword": "Carmela",
        "occurance": 97
      },
      {
        "_id": "58ab436a18a9b87641200c37",
        "keyword": "Guthrie",
        "occurance": 100
      },
      {
        "_id": "58ab436ace4de1935947e009",
        "keyword": "Valeria",
        "occurance": 122
      },
      {
        "_id": "58ab436ac526dc44386a067b",
        "keyword": "Gwendolyn",
        "occurance": 85
      },
      {
        "_id": "58ab436a4478ad78503a43f2",
        "keyword": "Warren",
        "occurance": 135
      },
      {
        "_id": "58ab436add9e30b8c2ff6cd5",
        "keyword": "Jamie",
        "occurance": 114
      },
      {
        "_id": "58ab436aa955543f986e4bed",
        "keyword": "Moreno",
        "occurance": 41
      },
      {
        "_id": "58ab436a903676baad5d0888",
        "keyword": "Bernadette",
        "occurance": 133
      },
      {
        "_id": "58ab436af515faab2b35fd4f",
        "keyword": "Robert",
        "occurance": 93
      },
      {
        "_id": "58ab436abb664c63b95956b8",
        "keyword": "Garza",
        "occurance": 113
      },
      {
        "_id": "58ab436ab0d7bb71baa83434",
        "keyword": "Colleen",
        "occurance": 95
      },
      {
        "_id": "58ab436a226ba9e4fdaed079",
        "keyword": "Dale",
        "occurance": 92
      },
      {
        "_id": "58ab436a6e8205888eb89e02",
        "keyword": "Gilda",
        "occurance": 33
      },
      {
        "_id": "58ab436a1ecb17d53dbd9b74",
        "keyword": "Tonia",
        "occurance": 76
      },
      {
        "_id": "58ab436ae772bf003e4bac72",
        "keyword": "Mcintyre",
        "occurance": 81
      },
      {
        "_id": "58ab436a2cd3999139115b46",
        "keyword": "Marva",
        "occurance": 113
      },
      {
        "_id": "58ab436ad4ea0ce5d94e6a46",
        "keyword": "Janna",
        "occurance": 130
      },
      {
        "_id": "58ab436ade192566a90bbd97",
        "keyword": "Jimenez",
        "occurance": 128
      },
      {
        "_id": "58ab436aea983f7c7164b22c",
        "keyword": "Patsy",
        "occurance": 70
      },
      {
        "_id": "58ab436a2d413302a806a402",
        "keyword": "Lee",
        "occurance": 66
      },
      {
        "_id": "58ab436abbf78dc7bf28e085",
        "keyword": "Maryanne",
        "occurance": 113
      },
      {
        "_id": "58ab436a3eed5b0268145be1",
        "keyword": "Sue",
        "occurance": 129
      },
      {
        "_id": "58ab436a58c6c774d99a5323",
        "keyword": "Zelma",
        "occurance": 125
      },
      {
        "_id": "58ab436a024ba3d598992d78",
        "keyword": "Loraine",
        "occurance": 139
      },
      {
        "_id": "58ab436a7516f5ad1267f7ca",
        "keyword": "Eula",
        "occurance": 51
      },
      {
        "_id": "58ab436acf36283db3792d8e",
        "keyword": "Gordon",
        "occurance": 77
      },
      {
        "_id": "58ab436ab7678ef8e64e48d0",
        "keyword": "Kenya",
        "occurance": 118
      },
      {
        "_id": "58ab436a612ca49e42a5ba22",
        "keyword": "Larsen",
        "occurance": 64
      },
      {
        "_id": "58ab436a00e72f4a448f4d17",
        "keyword": "Kay",
        "occurance": 64
      },
      {
        "_id": "58ab436a2f7b3d08a61047fe",
        "keyword": "Lucas",
        "occurance": 62
      },
      {
        "_id": "58ab436a07d8a89f5aec078f",
        "keyword": "Darlene",
        "occurance": 55
      },
      {
        "_id": "58ab436a21e7ac77de9c9124",
        "keyword": "Mccarthy",
        "occurance": 37
      },
      {
        "_id": "58ab436af8a45fe49552d681",
        "keyword": "Gentry",
        "occurance": 126
      },
      {
        "_id": "58ab436ab04bf6a28589a89f",
        "keyword": "Hoover",
        "occurance": 44
      },
      {
        "_id": "58ab436ac5d134445f3f3b17",
        "keyword": "Dorothea",
        "occurance": 140
      },
      {
        "_id": "58ab436a840dca98be92b77f",
        "keyword": "Yolanda",
        "occurance": 96
      },
      {
        "_id": "58ab436a7ec44b5801ee67b4",
        "keyword": "Evangeline",
        "occurance": 60
      },
      {
        "_id": "58ab436abfa8b4e461df45e9",
        "keyword": "Francesca",
        "occurance": 36
      },
      {
        "_id": "58ab436a1ad867be2e933462",
        "keyword": "Brittany",
        "occurance": 76
      },
      {
        "_id": "58ab436a9744213b58176786",
        "keyword": "Susie",
        "occurance": 74
      },
      {
        "_id": "58ab436ac65462477ee33600",
        "keyword": "Matthews",
        "occurance": 94
      },
      {
        "_id": "58ab436acdba4c556ee20483",
        "keyword": "Autumn",
        "occurance": 23
      },
      {
        "_id": "58ab436a1905468cd0e2d25c",
        "keyword": "Tisha",
        "occurance": 125
      },
      {
        "_id": "58ab436a90791a54086fa896",
        "keyword": "Reese",
        "occurance": 97
      },
      {
        "_id": "58ab436a5d3dda5523eca9a9",
        "keyword": "Hewitt",
        "occurance": 69
      },
      {
        "_id": "58ab436a745fe9beb187fb3d",
        "keyword": "Marian",
        "occurance": 138
      },
      {
        "_id": "58ab436a6aeaa4f9c3352a52",
        "keyword": "Rosalinda",
        "occurance": 59
      },
      {
        "_id": "58ab436aa4e49ad43a4feb14",
        "keyword": "Frank",
        "occurance": 121
      },
      {
        "_id": "58ab436ac981a8a79c142659",
        "keyword": "Blanchard",
        "occurance": 110
      },
      {
        "_id": "58ab436a46a84660b6aff52d",
        "keyword": "Beverly",
        "occurance": 30
      },
      {
        "_id": "58ab436a230b78d57e38277e",
        "keyword": "Elise",
        "occurance": 87
      },
      {
        "_id": "58ab436afbba5bbab34282fb",
        "keyword": "Janie",
        "occurance": 115
      },
      {
        "_id": "58ab436a35d3a3dede222001",
        "keyword": "Anastasia",
        "occurance": 101
      },
      {
        "_id": "58ab436a46175f97e29a96e2",
        "keyword": "Janis",
        "occurance": 39
      },
      {
        "_id": "58ab436a021adfbb7a810afc",
        "keyword": "Strong",
        "occurance": 81
      },
      {
        "_id": "58ab436ac476e6d1aca4b01c",
        "keyword": "Harriett",
        "occurance": 61
      },
      {
        "_id": "58ab436a64f2d52c1320120f",
        "keyword": "Cobb",
        "occurance": 101
      },
      {
        "_id": "58ab436a0f52242efdb91176",
        "keyword": "Tamra",
        "occurance": 81
      },
      {
        "_id": "58ab436af1c59ec6d20a85ea",
        "keyword": "Willa",
        "occurance": 66
      },
      {
        "_id": "58ab436a33d71e9b4097c2c9",
        "keyword": "Sherry",
        "occurance": 116
      },
      {
        "_id": "58ab436ae362b0364ee1a9e3",
        "keyword": "Bailey",
        "occurance": 36
      },
      {
        "_id": "58ab436ac72e74b57e1fc19f",
        "keyword": "Knox",
        "occurance": 118
      },
      {
        "_id": "58ab436a31844ac430a72f45",
        "keyword": "Olsen",
        "occurance": 28
      },
      {
        "_id": "58ab436ab8e77973a36d65ef",
        "keyword": "Christian",
        "occurance": 82
      },
      {
        "_id": "58ab436aa206b589b4782291",
        "keyword": "Sarah",
        "occurance": 40
      },
      {
        "_id": "58ab436ad51102b484b4cdae",
        "keyword": "Mai",
        "occurance": 20
      },
      {
        "_id": "58ab436ad60fc8dd8bb03160",
        "keyword": "Desiree",
        "occurance": 42
      },
      {
        "_id": "58ab436aca2476c248f37a67",
        "keyword": "Holcomb",
        "occurance": 23
      },
      {
        "_id": "58ab436a15330f91767aa3a9",
        "keyword": "Reed",
        "occurance": 83
      },
      {
        "_id": "58ab436a3878bd3525ffd42c",
        "keyword": "Burks",
        "occurance": 35
      },
      {
        "_id": "58ab436a95ff56dae2a5bf7c",
        "keyword": "Tanner",
        "occurance": 57
      },
      {
        "_id": "58ab436abf580974fec86ede",
        "keyword": "Shields",
        "occurance": 66
      },
      {
        "_id": "58ab436af0c0488fdb87c873",
        "keyword": "Jenny",
        "occurance": 121
      },
      {
        "_id": "58ab436a32114fbc9df3a80c",
        "keyword": "Lottie",
        "occurance": 82
      },
      {
        "_id": "58ab436afae6a119e4806459",
        "keyword": "Lee",
        "occurance": 132
      },
      {
        "_id": "58ab436a0b9169b458324bc3",
        "keyword": "Sheena",
        "occurance": 31
      },
      {
        "_id": "58ab436ad6e0ad37f2768771",
        "keyword": "Jaime",
        "occurance": 58
      },
      {
        "_id": "58ab436a53fdcd723aa52ca7",
        "keyword": "Rodriguez",
        "occurance": 135
      },
      {
        "_id": "58ab436a6269ac2f064cf9e9",
        "keyword": "Monroe",
        "occurance": 46
      },
      {
        "_id": "58ab436a32bf03930aca679c",
        "keyword": "Roxanne",
        "occurance": 81
      },
      {
        "_id": "58ab436ae1a0c842e9de6d18",
        "keyword": "Farley",
        "occurance": 112
      },
      {
        "_id": "58ab436a28ca6f5b86fb85a5",
        "keyword": "Rodriquez",
        "occurance": 119
      },
      {
        "_id": "58ab436ad17b2fcf61369532",
        "keyword": "Elizabeth",
        "occurance": 90
      },
      {
        "_id": "58ab436a56ad764cb08efd35",
        "keyword": "Everett",
        "occurance": 41
      },
      {
        "_id": "58ab436aebd5b36a2b81431a",
        "keyword": "Bryant",
        "occurance": 114
      },
      {
        "_id": "58ab436a19b56a40bee78b3e",
        "keyword": "Jarvis",
        "occurance": 136
      },
      {
        "_id": "58ab436a96c706e6b8cfcc3f",
        "keyword": "Paul",
        "occurance": 128
      },
      {
        "_id": "58ab436aa5ebed51ab46e38b",
        "keyword": "Calhoun",
        "occurance": 107
      },
      {
        "_id": "58ab436a1a7fe3c5aca3b5c0",
        "keyword": "Ericka",
        "occurance": 85
      },
      {
        "_id": "58ab436acf8e7a3c9fd8e18b",
        "keyword": "Chang",
        "occurance": 57
      },
      {
        "_id": "58ab436ae381cba1a6cd38a8",
        "keyword": "Debra",
        "occurance": 111
      },
      {
        "_id": "58ab436a8de9cd543efeb9b7",
        "keyword": "Melva",
        "occurance": 63
      },
      {
        "_id": "58ab436a4b900a88744a545b",
        "keyword": "Valarie",
        "occurance": 111
      },
      {
        "_id": "58ab436a2b33ccec789a8a74",
        "keyword": "Miller",
        "occurance": 83
      },
      {
        "_id": "58ab436af210216b39c97d2a",
        "keyword": "Millicent",
        "occurance": 78
      },
      {
        "_id": "58ab436a971d518aca371143",
        "keyword": "Brown",
        "occurance": 101
      },
      {
        "_id": "58ab436ac8d1f67adc0a1746",
        "keyword": "Russell",
        "occurance": 124
      },
      {
        "_id": "58ab436a856cb30a97af091e",
        "keyword": "Ellen",
        "occurance": 96
      },
      {
        "_id": "58ab436a62274dfff198b324",
        "keyword": "Whitley",
        "occurance": 54
      },
      {
        "_id": "58ab436aca1fdc02722ebe74",
        "keyword": "Jeannette",
        "occurance": 86
      },
      {
        "_id": "58ab436a0d7e018e6cb9a7b4",
        "keyword": "Duke",
        "occurance": 30
      },
      {
        "_id": "58ab436ac54ae8315a2876bb",
        "keyword": "Lessie",
        "occurance": 31
      },
      {
        "_id": "58ab436ac3e5ce111c273326",
        "keyword": "Talley",
        "occurance": 109
      },
      {
        "_id": "58ab436a82b506ef3e90f495",
        "keyword": "Mcneil",
        "occurance": 48
      },
      {
        "_id": "58ab436ab0ef4e645a599f5c",
        "keyword": "Cervantes",
        "occurance": 84
      },
      {
        "_id": "58ab436a448c81131cf03596",
        "keyword": "Nelda",
        "occurance": 30
      },
      {
        "_id": "58ab436aca74490f86db3cf4",
        "keyword": "Conrad",
        "occurance": 40
      },
      {
        "_id": "58ab436a79ad63ebc1972a01",
        "keyword": "Ford",
        "occurance": 124
      },
      {
        "_id": "58ab436a0e519c8205709b9e",
        "keyword": "Tonya",
        "occurance": 23
      },
      {
        "_id": "58ab436a67df213c03ca5fa6",
        "keyword": "Hicks",
        "occurance": 119
      },
      {
        "_id": "58ab436ac9069ae21ace799d",
        "keyword": "Holden",
        "occurance": 134
      },
      {
        "_id": "58ab436ab71941a18b7c7693",
        "keyword": "Kendra",
        "occurance": 140
      },
      {
        "_id": "58ab436aa3ec6b109f5be408",
        "keyword": "Schroeder",
        "occurance": 91
      },
      {
        "_id": "58ab436a4e2fea91881017a8",
        "keyword": "Joy",
        "occurance": 117
      },
      {
        "_id": "58ab436aa567dda4665b926f",
        "keyword": "Hahn",
        "occurance": 21
      },
      {
        "_id": "58ab436a54cf1e2643e05a6f",
        "keyword": "Dianna",
        "occurance": 65
      },
      {
        "_id": "58ab436a60158155d39e976d",
        "keyword": "Alisha",
        "occurance": 105
      },
      {
        "_id": "58ab436aa0fc22fd381a9915",
        "keyword": "Rosa",
        "occurance": 47
      },
      {
        "_id": "58ab436a03ab2eb29d6f0b50",
        "keyword": "Keri",
        "occurance": 32
      },
      {
        "_id": "58ab436aec279af39566dc0a",
        "keyword": "Brandie",
        "occurance": 94
      },
      {
        "_id": "58ab436afb0f14a18ea923d5",
        "keyword": "Middleton",
        "occurance": 106
      },
      {
        "_id": "58ab436a1477d8435a333d34",
        "keyword": "Gilbert",
        "occurance": 31
      },
      {
        "_id": "58ab436a122058affcc7714d",
        "keyword": "Faith",
        "occurance": 107
      },
      {
        "_id": "58ab436aafa520da96d56265",
        "keyword": "Misty",
        "occurance": 77
      },
      {
        "_id": "58ab436acc122c432ecbd327",
        "keyword": "Eddie",
        "occurance": 25
      },
      {
        "_id": "58ab436adf567a591a665ccb",
        "keyword": "Yates",
        "occurance": 119
      },
      {
        "_id": "58ab436a5370783cca62675e",
        "keyword": "Patel",
        "occurance": 122
      },
      {
        "_id": "58ab436a3f836dc84e233c0b",
        "keyword": "Rivas",
        "occurance": 83
      },
      {
        "_id": "58ab436aff16238f4c54f15b",
        "keyword": "Jami",
        "occurance": 109
      },
      {
        "_id": "58ab436a1e6355c1d65f99db",
        "keyword": "Benton",
        "occurance": 128
      },
      {
        "_id": "58ab436a26bcc16a582a75ee",
        "keyword": "Ball",
        "occurance": 62
      },
      {
        "_id": "58ab436a8a3c5b4f86a5272a",
        "keyword": "Christine",
        "occurance": 37
      },
      {
        "_id": "58ab436a0511268dfaf46551",
        "keyword": "Reva",
        "occurance": 37
      },
      {
        "_id": "58ab436aab9ff6e96dcdbf8f",
        "keyword": "Harrington",
        "occurance": 73
      },
      {
        "_id": "58ab436a74ec590ce9157d74",
        "keyword": "Hazel",
        "occurance": 89
      },
      {
        "_id": "58ab436a6951ce43a933cfc4",
        "keyword": "Myers",
        "occurance": 35
      },
      {
        "_id": "58ab436ad3e9562ddd47571e",
        "keyword": "Bauer",
        "occurance": 60
      },
      {
        "_id": "58ab436ac9bb2222d57d100e",
        "keyword": "Weiss",
        "occurance": 94
      },
      {
        "_id": "58ab436a7ef65c4eae4e80e6",
        "keyword": "Oneil",
        "occurance": 45
      },
      {
        "_id": "58ab436a04b740d06a696370",
        "keyword": "Sargent",
        "occurance": 44
      },
      {
        "_id": "58ab436ab16866d838879f25",
        "keyword": "Charmaine",
        "occurance": 79
      },
      {
        "_id": "58ab436a2c9c06f9ce2fe711",
        "keyword": "Dixie",
        "occurance": 133
      },
      {
        "_id": "58ab436aff610d87e8b272a8",
        "keyword": "Genevieve",
        "occurance": 134
      },
      {
        "_id": "58ab436a7741ca657c2ef54f",
        "keyword": "Henson",
        "occurance": 29
      },
      {
        "_id": "58ab436a5e6fee6390c38a84",
        "keyword": "Conway",
        "occurance": 72
      },
      {
        "_id": "58ab436a6e3ac6432b729051",
        "keyword": "Sears",
        "occurance": 119
      },
      {
        "_id": "58ab436aa84abcbbc7471590",
        "keyword": "Savannah",
        "occurance": 87
      },
      {
        "_id": "58ab436a862c71eb20b6a52f",
        "keyword": "Rhea",
        "occurance": 97
      },
      {
        "_id": "58ab436a1fe43be095a9dc59",
        "keyword": "Lambert",
        "occurance": 74
      },
      {
        "_id": "58ab436a487df06f8f6269c8",
        "keyword": "Ayala",
        "occurance": 39
      },
      {
        "_id": "58ab436a08eec7eb4d0267ef",
        "keyword": "Mcbride",
        "occurance": 62
      },
      {
        "_id": "58ab436ac7263600aa688428",
        "keyword": "Letha",
        "occurance": 107
      },
      {
        "_id": "58ab436a8bfdc6ef0bfb735c",
        "keyword": "Susana",
        "occurance": 55
      },
      {
        "_id": "58ab436a5cfbf9f4fb7d50c6",
        "keyword": "Juana",
        "occurance": 77
      },
      {
        "_id": "58ab436aa91ef89b886085d6",
        "keyword": "Meghan",
        "occurance": 108
      },
      {
        "_id": "58ab436aeb580c980c33aaf5",
        "keyword": "Short",
        "occurance": 90
      },
      {
        "_id": "58ab436a874fca759109169a",
        "keyword": "Woodward",
        "occurance": 32
      },
      {
        "_id": "58ab436a54c5ab32c3767790",
        "keyword": "Tanya",
        "occurance": 31
      },
      {
        "_id": "58ab436aa9b34445f51ed157",
        "keyword": "Maryann",
        "occurance": 71
      },
      {
        "_id": "58ab436ab1836f3053950ac9",
        "keyword": "Sadie",
        "occurance": 85
      },
      {
        "_id": "58ab436a2bc178a50f20e680",
        "keyword": "Corina",
        "occurance": 32
      },
      {
        "_id": "58ab436a2aea3004791d14f6",
        "keyword": "Angel",
        "occurance": 104
      },
      {
        "_id": "58ab436ac1d85254109fa723",
        "keyword": "Veronica",
        "occurance": 118
      },
      {
        "_id": "58ab436a3a32afe597b715d9",
        "keyword": "Rowena",
        "occurance": 72
      },
      {
        "_id": "58ab436a168e1357c2e89456",
        "keyword": "Bright",
        "occurance": 44
      },
      {
        "_id": "58ab436a0c032b1cd3b58d66",
        "keyword": "Shannon",
        "occurance": 29
      },
      {
        "_id": "58ab436a65bd09ee728be77f",
        "keyword": "Byers",
        "occurance": 68
      },
      {
        "_id": "58ab436a84d51ff422e76843",
        "keyword": "April",
        "occurance": 129
      },
      {
        "_id": "58ab436a18492fb45a9fd96d",
        "keyword": "Allie",
        "occurance": 107
      },
      {
        "_id": "58ab436a8e394cc2647892bc",
        "keyword": "Claire",
        "occurance": 31
      },
      {
        "_id": "58ab436aa300e4f6e5454f97",
        "keyword": "Zamora",
        "occurance": 50
      },
      {
        "_id": "58ab436aee283104b759b693",
        "keyword": "Shelton",
        "occurance": 75
      },
      {
        "_id": "58ab436a2f710dbb5a1e6dd4",
        "keyword": "Norman",
        "occurance": 102
      },
      {
        "_id": "58ab436ad5f60514f8088761",
        "keyword": "Bishop",
        "occurance": 34
      },
      {
        "_id": "58ab436acc193ce5b2218fc6",
        "keyword": "Gibson",
        "occurance": 57
      },
      {
        "_id": "58ab436a2f080465a61a933a",
        "keyword": "Cathy",
        "occurance": 35
      },
      {
        "_id": "58ab436abf522d91cd04de66",
        "keyword": "Dejesus",
        "occurance": 38
      },
      {
        "_id": "58ab436a3518f09734968bba",
        "keyword": "Knowles",
        "occurance": 58
      },
      {
        "_id": "58ab436a918d98ed6c398413",
        "keyword": "Ruiz",
        "occurance": 102
      },
      {
        "_id": "58ab436aa44720c62af65288",
        "keyword": "Bruce",
        "occurance": 41
      },
      {
        "_id": "58ab436ae87bff08fbf89009",
        "keyword": "Corine",
        "occurance": 116
      },
      {
        "_id": "58ab436a4e0bdc3de7f94f52",
        "keyword": "Cotton",
        "occurance": 103
      },
      {
        "_id": "58ab436afd0a5948ba1c4d12",
        "keyword": "Melisa",
        "occurance": 60
      },
      {
        "_id": "58ab436a2bb0fc77c9578de4",
        "keyword": "Angie",
        "occurance": 95
      },
      {
        "_id": "58ab436af84f760aeffa482f",
        "keyword": "Michele",
        "occurance": 94
      },
      {
        "_id": "58ab436a16b599faf9d35e0e",
        "keyword": "Ola",
        "occurance": 50
      },
      {
        "_id": "58ab436a59f24b556f5bda90",
        "keyword": "Fry",
        "occurance": 115
      },
      {
        "_id": "58ab436aec96349a47bb83f2",
        "keyword": "Smith",
        "occurance": 122
      },
      {
        "_id": "58ab436a793bbe74f8069b8d",
        "keyword": "Hayes",
        "occurance": 73
      },
      {
        "_id": "58ab436a96ca7f55d556d490",
        "keyword": "Cardenas",
        "occurance": 41
      },
      {
        "_id": "58ab436a506db30949af337f",
        "keyword": "Beck",
        "occurance": 55
      },
      {
        "_id": "58ab436ad2bcd658c798c997",
        "keyword": "Vazquez",
        "occurance": 107
      },
      {
        "_id": "58ab436af95a4e6fc31ab55e",
        "keyword": "Hollie",
        "occurance": 140
      },
      {
        "_id": "58ab436ace64c0e889066e1b",
        "keyword": "Wyatt",
        "occurance": 79
      },
      {
        "_id": "58ab436afacd8a8bc7c81f1c",
        "keyword": "Shanna",
        "occurance": 64
      },
      {
        "_id": "58ab436a25ab19844e531a4d",
        "keyword": "Lawrence",
        "occurance": 104
      },
      {
        "_id": "58ab436a83e84ac3240ee959",
        "keyword": "Salas",
        "occurance": 59
      },
      {
        "_id": "58ab436a6e8bc49ec61b02ad",
        "keyword": "Wilcox",
        "occurance": 124
      },
      {
        "_id": "58ab436a070437a8ac082d56",
        "keyword": "Williamson",
        "occurance": 72
      },
      {
        "_id": "58ab436a019bc9393891c3b4",
        "keyword": "Dawn",
        "occurance": 39
      },
      {
        "_id": "58ab436a8fcacfad45f2626f",
        "keyword": "Susanna",
        "occurance": 85
      },
      {
        "_id": "58ab436a98086b194dd01248",
        "keyword": "Essie",
        "occurance": 89
      },
      {
        "_id": "58ab436a0c350c9dfd0400e9",
        "keyword": "Marquita",
        "occurance": 44
      },
      {
        "_id": "58ab436a47c2d54925753773",
        "keyword": "Snow",
        "occurance": 36
      },
      {
        "_id": "58ab436a3bbcc6a398fbaff6",
        "keyword": "Contreras",
        "occurance": 75
      },
      {
        "_id": "58ab436a24d9a8e96ab6a485",
        "keyword": "John",
        "occurance": 29
      },
      {
        "_id": "58ab436abe101c580cb8ae5f",
        "keyword": "Mayer",
        "occurance": 82
      },
      {
        "_id": "58ab436a1fe180e41e13b23b",
        "keyword": "Selena",
        "occurance": 48
      },
      {
        "_id": "58ab436a4059e7395148c382",
        "keyword": "Poole",
        "occurance": 58
      },
      {
        "_id": "58ab436a88eb92846cdb0f02",
        "keyword": "Goodman",
        "occurance": 101
      },
      {
        "_id": "58ab436adf958342d27638ee",
        "keyword": "Mattie",
        "occurance": 73
      },
      {
        "_id": "58ab436ad667d9bfbb063880",
        "keyword": "Nunez",
        "occurance": 66
      },
      {
        "_id": "58ab436ab82fc95b0a86df7b",
        "keyword": "Rollins",
        "occurance": 21
      },
      {
        "_id": "58ab436af5e9ca7c592c565b",
        "keyword": "Dixon",
        "occurance": 96
      },
      {
        "_id": "58ab436a8480dc9c7925b59c",
        "keyword": "Velazquez",
        "occurance": 104
      },
      {
        "_id": "58ab436ae390a9aadf5ada81",
        "keyword": "Johnston",
        "occurance": 93
      },
      {
        "_id": "58ab436a43715ffb400571b8",
        "keyword": "Freda",
        "occurance": 97
      },
      {
        "_id": "58ab436a8d60ba13b42c362a",
        "keyword": "Perkins",
        "occurance": 44
      },
      {
        "_id": "58ab436ac0b029b64d1af65f",
        "keyword": "Serrano",
        "occurance": 23
      },
      {
        "_id": "58ab436a07c0965cc815afa8",
        "keyword": "Irma",
        "occurance": 72
      },
      {
        "_id": "58ab436a7e42c5425224e60e",
        "keyword": "Mcfadden",
        "occurance": 113
      },
      {
        "_id": "58ab436a75bf38127b2f7c9c",
        "keyword": "Wolfe",
        "occurance": 34
      },
      {
        "_id": "58ab436ac2e014799e0a5383",
        "keyword": "Latonya",
        "occurance": 31
      },
      {
        "_id": "58ab436af5ba618ffb7206dc",
        "keyword": "Dominique",
        "occurance": 129
      },
      {
        "_id": "58ab436a7caac38ac3aeacca",
        "keyword": "Latisha",
        "occurance": 117
      },
      {
        "_id": "58ab436a3a08ab1e3286e0df",
        "keyword": "Kristina",
        "occurance": 40
      },
      {
        "_id": "58ab436aff481ccdda423779",
        "keyword": "Rebekah",
        "occurance": 33
      },
      {
        "_id": "58ab436a17dd7f8034010efd",
        "keyword": "Alexandria",
        "occurance": 26
      },
      {
        "_id": "58ab436a06c66fef5da41774",
        "keyword": "Pate",
        "occurance": 27
      },
      {
        "_id": "58ab436a87e6fe8cb4fc5a77",
        "keyword": "Constance",
        "occurance": 76
      }
    ]
  }

  componentDidMount() {
    
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

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const randocolor = getRandomColor();
    const component = this;
    //Put the city locations into the data itself
    component.dataum.forEach(function (d, i) {
      d.radius = component.rScale(d.occurance);
      console.log(d.radius);
      d.x = Math.round(Math.random()) * 2000 - 1000;
      d.y = Math.round(Math.random()) * 2000 - 1000;
    });

    // Wrapper
    const blobWrapper = svg.append('g')
      .attr('class', 'blobWrapper')
      .style('filter', 'url(#gooeyCodeFilter)')
      .attr('fill', randocolor);

    //Place the blobs
    const blobs = blobWrapper.selectAll('.blobs')
      .data(component.dataum)
      .enter().append('circle')
      .attr('class', 'blobs')
      .attr('r', function (d) { return d.radius; })
      .attr('cx', component.centerx)
      .attr('cy', component.centery)
      .style('opacity', 1)
      .attr('fill', randocolor);


    //Circle over all others
    blobWrapper.append('circle')
      .attr('class', 'blobCover')
      .attr('r', component.coverCircleRadius)
      .attr('cx', component.centerx)
      .attr('cy', component.centery);


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////// Do the loop /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////	


    loop();
    setInterval(loop, 12000);
    function loop() {
      component.placeBlobs();
      // setTimeout(clusterCountry, 7000);
      setTimeout(component.backToCenter, 6000);
    }
  }

  handleChange(event) {
    // console.log(this.refs)
    const year = Number(event.target.value);
    const id = `#year${year}`;
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
    this.setState({ year });
  }

  handleWaypointEnter(year) {
    this.setState({ year });
  }

  handleWaypointLeave(year) {
    console.log('leaving' + year);
  }

  placeBlobs() {
    const component = this;
    //Make the cover circle shrink
    d3.selectAll('.blobCover')
      .transition().duration(2000)
      .attr('r', 0);

    // place blobs
    d3.selectAll('.blobs')
      .transition('move').duration(2000)
      // .delay(function(d,i) { return i*20; })
      .attr('r', function (d) {
        return d.radius = component.rScale(d.occurance);
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

  rScale() {
    const component = this;
    return (d3.scale.sqrt()
      .range([0, 20])
      .domain([0, d3.max(component.dataum, function (d) { return d.occurance; })]));
  }

  backToCenter() {
    const component = this;
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
      .attr('r', component.coverCircleRadius);

    //Move the blobs to the center
    d3.selectAll('.blobs')
      .transition()
      .duration(2000).delay(function (d, i) { return i * 10; })
      .attr('cx', component.centerx)
      .attr('cy', component.centery)
      .style('opacity', 1);

    d3.selectAll('.blurValues')
      .transition().duration(1000).delay(1000)
      .attrTween('values', function () {
        return d3.interpolateString('1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -6',
          '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5');
      });
  }

  render() {
    return (
      <div>
        <div style={{ position: 'fixed', top: 0, left: 0 }} id='renderedD3'>
        </div>
        <Select value={this.state.value} onChange={this.handleChange}>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
        </Select>
        <YearDisplay>{this.state.year}</YearDisplay>
        <Year2016>
          <Waypoint onEnter={() => this.handleWaypointEnter('2016')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2016">
              2016
          </div>
          </Waypoint>
        </Year2016>
        <Year2015>
          <Waypoint onEnter={() => this.handleWaypointEnter('2015')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2015">
              2015
            </div>
          </Waypoint>
        </Year2015>
        <Year2014>
          <Waypoint onEnter={() => this.handleWaypointEnter('2014')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2014">
              2014
            </div>
          </Waypoint>
        </Year2014>
        <Year2013>
          <Waypoint onEnter={() => this.handleWaypointEnter('2013')}>
            <div style={{ 'height': '50%', 'border': '1px solid black' }} id="year2013">
              2013
            </div>
          </Waypoint>
        </Year2013>
      </div>
    );
  }
}

export default Home;
