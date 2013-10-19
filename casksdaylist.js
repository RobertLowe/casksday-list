Brews = new Meteor.Collection("brews");

if (Meteor.isClient) {

  Session.setDefault('direction', 1)
  Session.setDefault('property', "number")

  Meteor.subscribe('brews');
  Meteor.subscribe('userData', function(){
    Session.set('loaded-user', true);
  });

  Template.brews.rendered = function(){
  }

  Template.brews.drinkChecked = function(){
    user = Meteor.user()

    Session.get('loaded-user');

    if(user && user.drinks && user.drinks.indexOf(this._id) == 0) {
      return "checked=checked";
    } else {
      return "";
    }
  }
  Template.brews.drunkChecked = function(){
    user = Meteor.user()

    Session.get('loaded-user');

    if(user && user.drunks && user.drunks.indexOf(this._id) >= 0) {
      return "checked=checked";
    } else {
      return "";
    }
  }

  Template.brews.loggedIn = function(){
    return Meteor.userId() != undefined;
  }

  Template.brews.brews = function(){

    term = Session.get('term');

    console.log(term);

    if( (term == "" || typeof(term) == "undefined") ){
      search = {}
    } else {
      search = {
        $or: [
          {'number': {$regex: new RegExp(".*" + term + ".*", "i")}},
          {'name': {$regex: new RegExp(".*" + term + ".*", "i")}},
          {'session': {$regex: new RegExp(".*" + term + ".*", "i")}},
          {'section': {$regex: new RegExp(".*" + term + ".*", "i")}}
        ]
      }
    }

    direction = Session.get('direction');
    property = Session.get('property');

    sort = {sort: {}}
    sort['sort'][property] = direction
    sort['sort']['number'] = 1

    return Brews.find(search, sort);
  }

  Template.brews.events({
    "change .drink" : function(event){
      element = $(event.target)

      if(element.is(':checked')){
        Meteor.call('addDrink', element.data('brew'), function(e,r){})
      } else {
        Meteor.call('removeDrink', element.data('brew'), function(e,r){})
      }

    },
    "change .drunk" : function(event){
      element = $(event.target)

      if(element.is(':checked')){
        Meteor.call('addDrunk', element.data('brew'), function(e,r){})
      } else {
        Meteor.call('removeDrunk', element.data('brew'), function(e,r){})
      }
    },
    "click .sorter" : function(event){
      element = $(event.target)

      direction = element.data('direction')
      property = element.data('property')

      Session.set('direction', direction)
      Session.set('property', property)
    }
  })

  Template.navbar.events({
    "keyup #term" : function(event){
      Session.set('term', $(event.target).val())
    },
    "change #term" : function(event){
      Session.set('term', $(event.target).val())
    } 
  })

}

if (Meteor.isServer) {
  Meteor.publish('brews', function(){
    return Brews.find();
  })

  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'drinks': 1, 'drunks': 1}});
  });

  Meteor.methods({
    "addDrink" : function(brew){
      Meteor.users.update(this.userId, { $addToSet: { drinks: brew }})
    },
    "addDrunk" : function(brew){
      Meteor.users.update(this.userId, { $addToSet: { drunks: brew }})
    },
    "removeDrink" : function(brew){
      Meteor.users.update(this.userId, { $pull: { drinks: brew }})
    },
    "removeDrunk" : function(brew){
      Meteor.users.update(this.userId, { $pull: { drunks: brew }})
    }
  })


  Brews.allow({
    insert: function(){ return false; },
    update: function(){ return false; },
    remove: function(){ return false; }
  })

  Meteor.startup(function () {

    if (Brews.find().count() == 0){
      Brews.insert({number: 1  , name: "ALECHEMY BREWING CITRA BURST - INDIA PALE ALE         " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 2  , name: "ARBOR ALES BREAKFAST STOUT -  STOUT                   " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 3  , name: "ARRAN BREWERY BLONDE  - GOLDEN WHEAT ALE              " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 4  , name: "ARRAN BREWERY  - DARK BROWN ALE                       " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 5  , name: "BEAVERTOWN BREWERY BLACK BETTY  - BLACK IPA           " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 6  , name: "BLACK JACK BEERS ACES HIGH -  INDIA PALE ALE          " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 7  , name: "BOX STEAM BREWERY DERAIL ALE  - INDIA PALE ALE        " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 8  , name: "BOX STEAM BREWERY FUNNEL BLOWER - ROBUST PORTER       " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 9  , name: "CRATE BREWERY CRATE PALE  - PALE ALE                  " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 10 , name: "DANIEL THWAITES LANCASTER BOMBER - BITTER             " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 11 , name: "HAND DRAWN MONKEY  IPA -  INDIA PALE ALE              " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 12 , name: "HARBOUR BREWERY PALE ALE NO.5 PALE ALE                " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 13 , name: "HARBOUR BREWERY IPA  BRITISH  INDIA PALE ALE          " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 14 , name: "HIGHLAND BREWING PALE ALE                             " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 15 , name: "HILDEN BREWERY TWISTED HOP - PALE ALE                 " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 16 , name: "HILDEN BREWERY BARNEY'S BREW - WHEAT BEER             " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 17 , name: "ILKLEY BREWERY MARY JANE - INDIA PALE ALE             " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 18 , name: "ILKLEY BREWERY HOLY COW - MILK STOUT                  " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 19 , name: "LONDON FIELDS LOVE NOT WAR - RED ALE                  " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 20 , name: "MAGIC ROCK BREWERY HIGH WIRE - WEST COAST PALE ALE    " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 21 , name: "MAGIC ROCK BREWERY CURIOUS  - ORIGINAL PALE ALE       " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 22 , name: "MONTY'S BREWERY MISCHIEF - GOLDEN ALE                 " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 23 , name: "MOOR BEER NOR`HOP - GOLDEN ALE                        " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 24 , name: "QUANTOCK BREWERY WILLS NECK - GOLDEN ALE              " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 25 , name: "RED WILLOW  WRECKLESS PALE ALE - AMERICAN  PALE ALE   " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 26 , name: "REDEMPTION HOPSPUR - ENGLISH  BITTER                  " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 27 , name: "RIDGEWAY BREWING INSANELY BAD ELF  - IMPERIAL RED ALE " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 28 , name: "ROOSTERS BREWERY 20TH ANNIVERSARY IPA - INDIA PALE ALE" , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 29 , name: "SIGNATURE BREW REMEDY - PALE ALE                      " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 30 , name: "SIGNATURE BREW CLEAR HEART - GOLDEN ALE               " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 31 , name: "SIREN CRAFT LIQUID MISTRESS - RED IPA                 " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 32 , name: "ST AUSTELL PROPER JOB EXPORT  IPA                     " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 33 , name: "SUMMER WINE OREGON PALE ALE  - PALE LAE               " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 34 , name: "THORNBRIDGE BREWERY JAIPUR IPA                        " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 35 , name: "THORNBRIDGE BREWERY WILD SWAN -  PALE ALE             " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 36 , name: "TINY REBEL DIRTY STOP OUT - STOUT                     " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 37 , name: "WELLS & YOUNG COURAGE - IMPERIAL RUSSIAN STOUT        " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 38 , name: "WELLS & YOUNG BOMBADIER - PREMIUM BITTER              " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 39 , name: "WILD BEER CO. REDWOOD  - SOUR RED                     " , session: "ALL SESSIONS" , section: "UNITED KINGDOM"})
      Brews.insert({number: 40, name: "HALF PINTS BREWING STRAWBERRY RHUBARB PIE AMBER ALE   " , session: "SESSION 1" , section: "MANITOBA"})
      Brews.insert({number: 41, name: "HALF PINTS BREWING GLOVES OFF SCRAPPER INIDA PALE ALE " , session: "SESSION 1" , section: "MANITOBA"})
      Brews.insert({number: 42, name: "HALF PINTS BREWING OOMPAH! OKTOBERFEST OKTOBERFEST    " , session: "SESSION 2" , section: "MANITOBA"})
      Brews.insert({number: 43, name: "HALF PINTS BREWING DRUNKEN BUNNY CHOCOLATE MILK STOUT " , session: "SESSION 3" , section: "MANITOBA"})
      Brews.insert({number: 44 , name: "ALLEY KAT BREWERY DRAGON SERIES WITH SENNITAL HOPS SINGLE HOP DOUBLE IPA" , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 45 , name: "BIG ROCK BREWERY BIG ROCK DARK CASCADE DARK ALE                         " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 46 , name: "BIG ROCK BREWERY BIG ROCK FUGGLES DARK ALE                              " , session: "SESSION 2" , section: "ALBERTA"})
      Brews.insert({number: 47 , name: "BREW BROTHERS AMARILLO IPA INDIA PALE ALE                               " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 48 , name: "BREWSTERS TONGUE CUTTER IPA AMERICAN IPA                                " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 49 , name: "BREWSTERS AARON'S AMBER ALE AMBER ALE                                   " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 50 , name: "BREWSTERS BREWSTERS WINTER WARMER BELGIAN DUBBEL                        " , session: "SESSION 2" , section: "ALBERTA"})
      Brews.insert({number: 51 , name: "GRIZZLY PAW RUTTING ELK RED AMBER                                       " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 52 , name: "HOGS HEAD BREWERY HOP SLAYER  INDIA PALE ALE                            " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 53 , name: "VILLAGE BREWERY VILLAGE BIG LEAGUE BLONDE AMERICAN BLONDE ALE           " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 54 , name: "VILLAGE BREWERY VILLAGE BOURGEOIS PIG AMERICAN BLACK ALE                " , session: "SESSION 2" , section: "ALBERTA"})
      Brews.insert({number: 55 , name: "VILLAGE BREWERY VILLAGE MONK CHAI PORTER AMERCIAN SPICED PORTER         " , session: "SESSION 3" , section: "ALBERTA"})
      Brews.insert({number: 56 , name: "WILD ROSE BREWERY THE WHITE SHADOW SPICED WHITE IPA                     " , session: "SESSION 1" , section: "ALBERTA"})
      Brews.insert({number: 57 , name: "WILD ROSE BREWERY GOOD OL` CHERRY BROWN FLANDERS STYLE BROWN ALE        " , session: "SESSION 2" , section: "ALBERTA"})
      Brews.insert({number: 58 , name: "BRIDGE BREWING CO. 40 SHOT ESPRESSO STOUT STOUT                                   " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 59 , name: "CANNERY BREWING WILDFIRE IPA INDIA PALE ALE                                       " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 60 , name: "CENTRAL CITY BREWING CENTRAL CITY IMPERIAL IPA IMPERIAL IPA                       " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 61 , name: "CENTRAL CITY BREWING RED RACER BERRY COLADA INFUSED WHITE ALE WITH SUMMER BERRIES " , session: "SESSION 3" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 62 , name: "COAL HARBOUR BREWING WOODLAND WIT - BELGIAN WIT W. TANGERINE, SZECHUAN PEPPERCORN " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 63 , name: "DEEPCOVE BREWERS AND DISTILLERS LOUD MOUTH PALE ALE                               " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 64 , name: "DRIFTWOOD SARTORI HARVEST IPA WET HOPPED AMERICAN IPA                             " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 65 , name: "FOUR WINDS BREWING CITRA LEMONGRASS IPA INDIA PALE ALE                            " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 66 , name: "GRANVILLE ISLAND BREWING MAD DASH EXTRA SPECIAL BITTER                            " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 67 , name: "GRANVILLE ISLAND BREWING THE PUMPKINING PUMPKIN ALE                               " , session: "SESSION 2" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 68 , name: "HOWE SOUND BREWING RUMPKINEATER  IMPERIAL PUMPKIN ALE (INFUSED WITH SPICED RUM)   " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 69 , name: "HOWE SOUND BREWING PUMPKIN STOUT OATMEAL STOUT WITH PUMPKIN                       " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 70 , name: "HOWE SOUND BREWING BALDWIN & COOPER BEST BITTER EXTRA SPECIAL BITTER              " , session: "SESSION 2" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 71 , name: "HOWE SOUND BREWING GATHERING STORM CDA CASCADIAN DARK ALE                         " , session: "SESSION 3" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 72 , name: "NELSON BREWERY FULL NELSON ORGANIC IMPERIAL IPA IMPERIAL IPA                      " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 73 , name: "PARALLEL 49 BREWING CO. UGLY SWEATY MILK STOUT MILK STOUT                         " , session: "SESSION 2" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 74 , name: "PARALLEL 49 BREWING CO. SALTY SCOT SEA SALTED CARAMEL SCOTCH ALE                  " , session: "SESSION 3" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 75 , name: "PARALLEL 49 BREWING CO. PASSION FRUIT  IPA INDIA PALE ALE                         " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 76 , name: "RED TRUCK BEER CO.* RED TRUCK ALE AMERICAN AMBER ALE                              " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 77 , name: "STORM BREWING CO.* BLACK FOREST CAKE STOUT STOUT                                  " , session: "SESSION 2" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 78 , name: "STORM BREWING CO.* IMPERIAL FLANDERS  FLANDERS RED                                " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 79 , name: "TOWNSITE BREWING* BIERE D`HIVER (WITH OAK CHIPS) BELGIAN DUBBEL                   " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 80 , name: "TREE BREWING HOP HEAD DOUBLE IPA DOUBLE IPA                                       " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 81 , name: "WHISLTER BREWING IMPERIAL ESPRESSO BLACK TUSK ALE DARK MILD                       " , session: "SESSION 1" , section: "BRITISH COLUMBIA"})
      Brews.insert({number: 82   , name: "A L'ABRI DE LA TEMPETE TERREFERME INDIA PALE ALE                          " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 83   , name: "BENELUX BREWPUB (X) CHIEF WEE HEAVY                                       " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 84   , name: "BENELUX BREWPUB (X) CUDA AMERICAN IPA                                     " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 85   , name: "BENELUX BREWPUB (X) EPONYME BELGIAN SAISON                                " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 86   , name: "BENELUX BREWPUB (X) INTEMPERANCE ENGLISH PALE ALE                         " , session: "SESSION 3" , section: "QUEBEC"})
      Brews.insert({number: 87   , name: "BRASSERIE ARTSANALE LA SOUCHE  MOISSONNEUSE BATTEUSE HARVEST IPA          " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 88   , name: "BRASSERIE ARTSANALE LA SOUCHE  PARKEVILLE AMERICAN PALE ALE               " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 89   , name: "BRASSERIE DIEU DU CIEL! (X) BARAQUE AMERICAN IPA                          " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 90   , name: "BRASSERIE DIEU DU CIEL! (X) CHEMIN DE CROIX OLD-STYLE INDIA PORTER        " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 91   , name: "BRASSERIE DIEU DU CIEL! (X) MEA CULPA INDIA CREAM ALE                     " , session: "SESSION 3" , section: "QUEBEC"})
      Brews.insert({number: 92   , name: "BRASSERIE DIEU DU CIEL! (X) HERBES A DETOURNE NEW WORLD TRIPEL WITH CITRA " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 93   , name: "BRASSERIE DIEU DU CIEL! (X) CORPUS CHRISTI RYE PALE ALE                   " , session: "SESSION 3" , section: "QUEBEC"})
      Brews.insert({number: 94   , name: "BRASSEURS DU MONDE (X) CERISETTE DU BRETTEUX KRIEK                        " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 95   , name: "BRASSEURS DU MONDE (X) ROBUST PORTER CHIPOTLE 2013 ROBUST PORTER          " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 96   , name: "BRASSERIE DUNHAM (X) DOUBLE DOSE  INDIA PALE ALE                          " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 97   , name: "BRASSERIE DUNHAM (X) LEO'S EARLY BREAKFAST INDIA PALE ALE                 " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 98   , name: "HOPFENSTARK END OF THE TRAIL AMERICAN PALE ALE                            " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 99   , name: "HOPFENSTARK GREG 'HARVEST' AMERICAN FOREIGN STOUT                         " , session: "SESSION 3" , section: "QUEBEC"})
      Brews.insert({number: 100  , name: "LE SAINT-BOCK-BRASSERIE ARTISANLE T`AMERE DR. RUDI INDIA PALE ALE (SMASH) " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 101  , name: "LE TROU DU DIABLE (X) RESERVE JACQUES BUTEUX SOUR WILD ALE                " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 102  , name: "LE TROU DU DIABLE (X) SANG-D`ENCRE IRISH DRY STOUT                        " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 103  , name: "LE TROU DU DIABLE (X) IMPERIALE SAISON SAISON                             " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 104  , name: "LE TROU DU DIABLE (X) WHITE IPA INDIA PALE ALE                            " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 105  , name: "LE TROU DU DIABLE (X) PETITE BUTEUSE BELGIAN TABLE                        " , session: "SESSION 3" , section: "QUEBEC"})
      Brews.insert({number: 106  , name: "LES BRASSEURS DU TEMPS (X) SCIE TROUILLARDE PUMPKIN ALE                   " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 107  , name: "LES BRASSEURS DU TEMPS (X) DIABLE AU CORPS IMPERIAL IPA                   " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 108  , name: "LES TROIS MOUSQUETAIRES (X) POLARIS  INDIA PALE ALE                       " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 109  , name: "LES TROIS MOUSQUETAIRES APA SPECIALE AMERICAN PALE ALE                    " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 110  , name: "LES TROIS MOUSQUETAIRES OUD BRUIN  OAK AGED WILD ALE                      " , session: "SESSION 3" , section: "QUEBEC"})
      Brews.insert({number: 111  , name: "LES TROIS MOUSQUETAIRES PORTER BALTIQUE EXTRA HOP BALTIC PORTER           " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 112  , name: "LES TROIS MOUSQUETAIRES KELLERWEISSE HEFEWEIZEN/KELLERBIER                " , session: "SESSION 2" , section: "QUEBEC"})
      Brews.insert({number: 113  , name: "MCAUSLAN BREWING INC. ST.AMBROISE PALE ALE AMERICAN PALE ALE              " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 114  , name: "MCAUSLAN BREWING INC. DOUBLE IPA IMPERIAL INDIA PALE ALE                  " , session: "SESSION 1" , section: "QUEBEC"})
      Brews.insert({number: 115  , name: "MICROBRASSERIE LE CASTOR YAMIKA IPA AMERICAN IPA                          " , session: "SESSION 1"  , section: "QUEBEC"})
      Brews.insert({number: 116 , name: "BIG SPRUCE CEREAL KILLER OATMEAL STOUT                     " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 117 , name: "BOXING ROCK BREWING CO. WET WILLIE HARVEST ALE             " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 118 , name: "BRIDGE BREWING CO. STRONG BELGIAN PALE STRONG DARK BELGIAN " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 119 , name: "GARRISON BREWING EAST KENT GOLDING IPA INDIA PALE ALE      " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 120 , name: "GRANITE BREWING PECULIAR OLD-STYLE ENGLISH STRONG ALE      " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 121 , name: "HELL BAY HELL BAY ENGLISH ALE EXTRA SPECIAL BITTER         " , session: "SESSION 2" , section: "NS / NB / PEI"})
      Brews.insert({number: 122 , name: "PICAROONS MILDRED IRISH RED                                " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 123 , name: "PROPELLER BREWERY DRY HOPPED ESB EXTRA SPECIAL BITTER      " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 124 , name: "PUMPHOUSE PREMIUM LAGER AMERICAN AMBER LAGER               " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 125 , name: "GREG NASH NASH IPA AMERICAN IPA                            " , session: "SESSION 3" , section: "NS / NB / PEI"})
      Brews.insert({number: 126 , name: "UNCLE LEO'S BREWING SMOKED PORTER ROBUST PORTER            " , session: "SESSION 3" , section: "NS / NB / PEI"})
      Brews.insert({number: 127 , name: "PRINCE EDWARD ISLAND BREWING PUMPKIN PORTER PORTER         " , session: "SESSION 1" , section: "NS / NB / PEI"})
      Brews.insert({number: 128 , name: "AMSTERDAM BREWING CO. FULL CITY DOUBLE TEMPEST IMPERIAL STOUT (WITH ETHIOPIAN COFFEE) " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 129 , name: "AMSTERDAM BREWING CO. EL JAGUAR  IMPERIAL STOUT (WITH CHOCOLATE & CHILIES)            " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 130 , name: "AMSTERDAM BREWING CO. X GREAT LAKES MAVERIK & GOSE GERMAN GOSE                        " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 131 , name: "AMSTERDAM BREWING CO. VICARS VICE OLDE ALE WITH SOUR CHERRIES                         " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 132 , name: "AMSTERDAM BREWING CO. HIGHBORN FARMHAND FARMHOUSE ALE (WITH BRETT & NOBLE HOPS)       " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 133 , name: "ARCH BREWING CO. DINNER JACKET INDIA PALE ALE                                         " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 134 , name: "BARLEY DAYS BREWERY WIND & SAIL DARK ALE                                              " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 135 , name: "BARLEY DAYS BREWERY ROYAL GEORGE BROWN ALE MILD                                       " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 136 , name: "BEAU'S ALL NATURAL BREWING CO THE TOM GREEN BEER MILK STOUT                           " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 137 , name: "BEAU'S ALL NATURAL BREWING CO KISSMEYER NORDIC PALE ALE NORDIC PALE ALE               " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 138 , name: "BEAU'S ALL NATURAL BREWING CO TWO WEEKS NOTICE GERMAN PORTER                          " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 139 , name: "BEER ACADEMY   BREWED AWAKENING ESPRESSO PORTER                                       " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 140 , name: "BELLWOODS BREWERY  BLITZEN 2013 PARTIAL SOUR MASH IMPERIAL SAISON WITH LEMON          " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 141 , name: "BELLWOODS BREWERY  DONKEY VENOM BRETT BARREL-AGED SOUR BALTIC PORTER                  " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 142 , name: "BELLWOODS BREWERY  HELLWOODS IMPERIAL STOUT                                           " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 143 , name: "BELLWOODS BREWERY  BRETTAL HEAD ALL-BRETT AMERICAN WHEAT (WITH LEMON)                 " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 144 , name: "BELLWOODS BREWERY  YOUNG LAMBDA BARREL-AGED QUAD (WITH BRETT)                         " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 145 , name: "BIG RIG BREWERY SCOTCHY SCOTCH SCOTCH ALE                                             " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 146 , name: "BLACK OAK BREWING CO. ARTIFICIAL CRUNCHY FROG PALE ALE                                " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 147 , name: "BLACK OAK BREWING CO. BLACKOAKBERRY PORTER ROBUST PORTER                              " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 148 , name: "BROADHEAD BREWING CO. WICKED WILD HARVEST AMBER ALE                                   " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 149 , name: "CAMERON'S BREWING CO. RESURRECTION  ROGGENBIER                                        " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 150 , name: "CHESIRE VALLEY BREWING  CHESHIRE VALLEY CD2013 AMERICAN PALE ALE                      " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 151 , name: "CLOCK TOWER BREWPUB HONEY PUMPKIN PUMPKIN ALE                                         " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 152 , name: "DURHAM BREWING SIGNATURE ALE BRITISH PALE ALE                                         " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 153 , name: "DURHAM BREWING FRESH HOP GOLDEN ALE                                                   " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 154 , name: "DURHAM BREWING DURHAM ESB EXTRA SPECIAL BITTER                                        " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 155 , name: "F&M STONEHAMMER SOUR-Y ABOUT LAST YEAR SOUR BOCK                                      " , session: "ALL SESSIONS"  , section: "ONTARIO"})
      Brews.insert({number: 156 , name: "FLYING MONKEY'S CRAFT BREWERY WET HOP CANADIAN AUTUMN WET HOPPED PALE ALE             " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 157 , name: "FLYING MONKEY'S  CHIMAERA ONE CALIFORNIA COMMON                                       " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 158 , name: "FLYING MONKEY'S  X BARNSTORMER BREWING BREAKING BAD BROWN BROWN ALE                   " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 159 , name: "GET WELL NANO BREWERY GETWELL PORTER ROBUST PORTER                                    " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 160 , name: "GET WELL NANO BREWERY X INDIE ALE HOUSE OPERATION WOLF  INIDA PALE ALE                " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 161 , name: "GRAND RIVER BREWING BEETIFIDE BOHEMIAN BEET BEER                                      " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 162 , name: "GRAND RIVER RASPBERRY BRUNETTE BRITISH SESSION ALE  / GINGER ALE (W. RASPBERRIES)     " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 163 , name: "GRANITE BREWERY PUMPKIN ALE PUMPKIN ALE                                               " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 164 , name: "GRANITE BREWERY HOPPING MAD AMERCIAN PALE ALE                                         " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 165 , name: "GRANITE BREWERY BEST BITTER SPECIAL SPECIAL ENGLISH BITTER                            " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 166 , name: "GRANITE BREWERY LADY MACBETH  SCOTCH ALE                                              " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 167 , name: "GRANITE BREWERY GIN LANE ALE BARLEY WINE                                              " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 168 , name: "GREAT LAKES BREWERY PUMPKIN WOUND PUMPKIN PORTER                                      " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 169 , name: "GREAT LAKES BREWERY LIMP PUPPET AMERICAN PALE ALE                                     " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 170 , name: "GREAT LAKES BREWERY HARRY PORTER BOURBON BARREL-AGED PORTER WITH VANILLA              " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 171 , name: "GREAT LAKES BREWERY NO CHANCE WITH MORANA BELGIAN SAISON WITH BRETT                   " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 172 , name: "GREAT LAKES BREWERY FANGBONER INDIA BRETT ALE                                         " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 173 , name: "GREAT LAKES BREWERY BUSTED LEG TRANNY BELGIAN TRIPEL WITH BRETT                       " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 174 , name: "HOCKLEY BREWERY JAFFA CAKE ALE BROWN ALE                                              " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 175 , name: "HOUSE ALES TIMS WAY PORTER                                                            " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 176 , name: "HOUSE ALES  MATTS MARATHON MILD ENGLISH MILD                                          " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 177 , name: "HOUSE ALES  SWAG OUT STOUT IMPERIAL STOUT                                             " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 178 , name: "HOUSE ALES  BREAKFAST STOUT STOUT                                                     " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 179 , name: "HOUSE ALES  FERMIUM IMPERIAL BLACK IPA                                                " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 180 , name: "HOUSE ALES  RUN ESB BLACK EXTRA SPECIAL BITTER                                        " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 181 , name: "INDIE ALEHOUSE  PUMPKIN ABBEY BELGIAN PUMPKIN ALE                                     " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 182 , name: "INDIE ALEHOUSE  INSTIGATOR IPA INDIA PALE ALE                                         " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 183 , name: "INDIE ALEHOUSE  BREAKFAST PORTER PORTER                                               " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 184 , name: "INDIE ALEHOUSE X KARATE GARAGE CAN I PLEASE HAVE SOME S`MORE S`MORE STOUT             " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 185 , name: "JUNCTION CRAFT BREWING BAVARIAN SAUSAGE PARTY FESTBIER                                " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 186 , name: "JUNCTION CRAFT BREWING DARK HARVESTER AMERICAN PALE ALE                               " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 187 , name: "KENSINGTON BREWING CO. TRAGICALLY HOPPED AMERICAN PALE ALE                            " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 188 , name: "LEFT FIELD BREWERY EEPHUS OATMEAL BROWN ALE                                           " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 189 , name: "LIBERTY VILLAGE BREWING CO. GUMMI BEAR PALE ALE                                       " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 190 , name: "MACLEAN'S ALES MACLEAN'S SCOTCH ALE SCOTCH ALE                                        " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 191 , name: "MAGNOTTA BREWERY VALENCIA BROWN ALE (ORANGE & CINNAMON)                               " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 192 , name: "MILL STREET BREWERY 2013 BOURBON-BARREL BARLEY WINE ENGLISH BARLEY WINE               " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 193 , name: "MUSKOKA BREWERY HARVEST ALE AMERICAN PALE ALE                                         " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 194 , name: "MUSKOKA BREWERY GOURD GRIEF PUMPKIN ALE                                               " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 195 , name: "MUSKOKA BREWERY TWICE AS MAD TOM IMPERIAL INDIA PALE ALE                              " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 196 , name: "MUSKOKA BREWERY MASALA CHAIPA INDIA PALE ALE                                          " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 197 , name: "MUSKOKA BREWERY CABIN FEVER #4 INDIA PALE ALE                                         " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 198 , name: "NEUSTADT SPRINGS BREWERY BIG DOG PORTER ROBUST PORTER                                 " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 199 , name: "NIAGARA COLLEGE TEACHING BREWERY RYE IN THE SKY DOUBLE IPA                            " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 200 , name: "NIAGARA OAST HOUSE BREWERS MILD R`OAST MILD ALE                                       " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 201 , name: "NICKELBROOK BREWING CO. LOLLIGAGGER SESSION  IPA INDIA PALE ALE                       " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 202 , name: "NICKELBROOK BREWING CO. PISSED OFF PETE'S PUMPKIN PORTER                              " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 203 , name: "NICKELBROOK BREWING CO. ONTARIO PALE WET HOP AMERICAN PALE ALE                        " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 204 , name: "NICKELBROOK BREWING CO. X BUSH PILOT X NOGNE O  TEST PILOT EISBOCK AGED IN OAK        " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 205 , name: "NICKELBROOK BREWING CO. X SAWDUST CITY '11/05' BARREL-AGED BARLEY WINE                " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 206 , name: "NORTH WINDS BREWERY X ONTARIO HOP ASSOCIATION  ITS ALL IN THE HIPS ROBUST PORTER      " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 207 , name: "SAWDUST CITY BREWING CO. THE XTC VERSION WAS BETTERER SMOKED PUMPKIN ROGGENBIER       " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 208 , name: "SAWDUST CITY BREWING CO. MOUNTANEERING I(P.A) OATMEAL RED IPA                         " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 209 , name: "SAWDUST CITY BREWING CO. CREAM IN YOUR JEANS IPA INDIA PALE ALE                       " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 210 , name: "SAWDUST CITY BREWING CO. A NUN ROLLING DOWN A HILL OATMEAL STOUT                      " , session: "SESSION 2"     , section: "ONTARIO"})
      Brews.insert({number: 211 , name: "SAWDUST CITY BREWING CO. KRANBERRY KOLSCH KOLSCH (W. CRANBERRIES)                     " , session: "SESSION 3"     , section: "ONTARIO"})
      Brews.insert({number: 212 , name: "SHACKLANDS BREWERY FARMHOUSE IPA BELGIAN INDIA PALE ALE                               " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 213 , name: "WELLINGTON BREWERY IRON DUKE SAISON DARK SAISON                                       " , session: "SESSION 1"     , section: "ONTARIO"})
      Brews.insert({number: 214 , name: "BRASSEURS SANS GLUTEN GLUTENBERG BLONDE BLONDE ALE                     " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 215 , name: "BRASSEURS SANS GLUTEN GLUTENBERG AMERICAN PALE ALE AMERICAN PALE ALE   " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 216 , name: "HOITY TOITY CASK 66 OFF DRY APPLE CIDER                                " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 217 , name: "LES VERGERS DE LA COLLINE ROUGE DOLGO CRABAPPLE CIDER                  " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 218 , name: "LES VERGERS DE LA COLLINE HOP CIDER HYBRID CIDER                       " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 219 , name: "LES VERGERS DE LA COLLINE FRANCAIS CIDER IN OAK BARREL                 " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 220 , name: "SNOWMAN BREWING MAKE LIKE A TREE AND LEAF MAPLE PORTER                 " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 221 , name: "SPIRIT TREE CIDER HERITAGE HOPS DRY HOPPED HERITAGE APPLE CIDER        " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 222 , name: "SPIRIT TREE CIDER DOUBLE PAGAN'S RED SUMAC-INFUSED RED CRABAPPLE CIDER " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 223 , name: "SPIRIT TREE CIDER PUMPKIN NEW ENGLAND CIDER NEW ENGLAND STYLE CIDER    " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 224 , name: "WEST AVENUE CIDER CHERRY BEACH BARREL-AGED CHERRY CIDER                " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 225 , name: "WEST AVENUE CIDER BARRETT FULLERS SECRET BOURBON BARREL-AGED CIDER     " , session: "ALL SESSIONS" , section: "GLUTEN FREE / CIDER"})
      Brews.insert({number: 226 , name: "FLYING MONKEY'S CRAFT BREWERY PINK DIME  INDIA PALE ALE " , session: "ALL SESSIONS" , section: "IPA CHALLENGE"})
      Brews.insert({number: 227 , name: "HOUSE ALES  WESTSIDE IPA INDIA PALE ALE                 " , session: "ALL SESSIONS" , section: "IPA CHALLENGE"})
      Brews.insert({number: 228 , name: "HOPFENSTARK POST COLONIAL IPA INDIA PALE ALE            " , session: "ALL SESSIONS" , section: "IPA CHALLENGE"})
      Brews.insert({number: 229 , name: "LEFT FIELD BREWERY RESIN BAG IPA INDIA PALE ALE         " , session: "ALL SESSIONS" , section: "IPA CHALLENGE"})
    }
  });
}
