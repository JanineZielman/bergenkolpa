import { NextResponse } from "next/server";

export function middleware(req) {
  console.log(req)
  const { pathname } = req.nextUrl;

  if (pathname === "/nl") {
    return NextResponse.redirect(new URL("/nl-nl", req.nextUrl));
  }

	if (pathname === "/en") {
    return NextResponse.redirect(new URL("/en-gb", req.nextUrl));
  }

  if (pathname.indexOf("398_20844214963161620171.html") > -1) {
    return NextResponse.redirect(new URL(`/zh-cn`, req.nextUrl));
  }

  // recent

  if (pathname.indexOf("53_recent.html") > -1) {
    return NextResponse.redirect(new URL(`/recent`, req.nextUrl));
  }

  const recentPages = [
    '768_job_dura_prijs_2020.html',
    '634_food_to_be.html',
    '549_world_expo_2015.html',
    '318_bankok_adaptive_city_2045.html',
    '315_rotterdam_architectuurprijs_2012.html',
    '86_architectuur_als_noodzaak.html',
    '270_glimpses_2040_amsterdam_homemade.html',
    '278_architecture_and_the_city_festival_san_francisco.html',
    '293_world_architecture_festival_2011.html'
  ]

  for (var i = 0; i < recentPages.length; i++ ){
    if (pathname.indexOf(recentPages[i]) > -1) {
      return NextResponse.redirect(new URL(`/recent`, req.nextUrl));
    }
  }

  // office

  const officePages = [
    '3_introduction.html',
    '51_designteam_clients.html',
    '13_curriculum_vitae.html',
    '12_adress_contact.html',
    '76_vacancies.html'
  ]

  for (var i = 0; i < officePages.length; i++ ){
    if (pathname.indexOf(officePages[i]) > -1) {
      return NextResponse.redirect(new URL(`/bureau`, req.nextUrl));
    }
  }

  // projects

  // bouwrealisatie

  if (pathname.indexOf('16_family_scraper_de_maasbode.html') > -1) {
    return NextResponse.redirect(new URL(`/#family-scraper-de-maasbode-eng`, req.nextUrl));
  }
  if (pathname.indexOf('587_boulevard_woningen_nieuwe_waterweg.html') > -1) {
    return NextResponse.redirect(new URL(`#maasbalkon`, req.nextUrl));
  }
  if (pathname.indexOf('587_boulevard_houses_nieuwe_waterweg.html') > -1) {
    return NextResponse.redirect(new URL(`/#maasbalkon`, req.nextUrl));
  }
  if (pathname.indexOf('583_duin_almere_noorderduin.html') > -1) {
    return NextResponse.redirect(new URL(`/#duin-almere-noorderduin`, req.nextUrl));
  }
  if (pathname.indexOf('654_duin_almere_boomrijk.html') > -1) {
    return NextResponse.redirect(new URL(`/#duin-almere-boomrijk`, req.nextUrl));
  }
  if (pathname.indexOf('552_dakserre_agrotopia.html') > -1) {
    return NextResponse.redirect(new URL(`#dakserre-agrotopia2`, req.nextUrl));
  }
  if (pathname.indexOf('552_rooftop_greenhouse_agrotopia.html') > -1) {
    return NextResponse.redirect(new URL(`/#dakserre-agrotopia2`, req.nextUrl));
  }
  if (pathname.indexOf('751_timber_tower_rotterdam.html') > -1) {
    return NextResponse.redirect(new URL(`/#timber-tower-rotterdam`, req.nextUrl));
  }
  if (pathname.indexOf('732_vertical_farm_hengshui.html') > -1) {
    return NextResponse.redirect(new URL(`/#vertical-farm-hengshui`, req.nextUrl));
  }
  if (pathname.indexOf('691_vertical_farm_beijing.html') > -1) {
    return NextResponse.redirect(new URL(`/#vertical-farm-beijing`, req.nextUrl));
  }
  if (pathname.indexOf('46_cohousing_nabuurschap.html') > -1) {
    return NextResponse.redirect(new URL(`/#cohousing-neighbourship`, req.nextUrl));
  }
  if (pathname.indexOf('46_cohousing_neigbourship.html') > -1) {
    return NextResponse.redirect(new URL(`/#cohousing-neighbourship`, req.nextUrl));
  }
  if (pathname.indexOf('71_cohousing_tuinkamers.html') > -1) {
    return NextResponse.redirect(new URL(`/#cohousing-tuinkamers`, req.nextUrl));
  }
  if (pathname.indexOf('71_cohousing_garden_rooms.html') > -1) {
    return NextResponse.redirect(new URL(`/#cohousing-tuinkamers`, req.nextUrl));
  }
  if (pathname.indexOf('235_westpolder_centrum.html') > -1) {
    return NextResponse.redirect(new URL(`/#westpolder-centrum`, req.nextUrl));
  }
  if (pathname.indexOf('235_westpolder_center.html') > -1) {
    return NextResponse.redirect(new URL(`/#westpolder-centrum`, req.nextUrl));
  }
  if (pathname.indexOf('681_manufakture.html') > -1) {
    return NextResponse.redirect(new URL(`/#maasbalkon`, req.nextUrl));
  }
  if (pathname.indexOf('18_mullerpier.html') > -1) {
    return NextResponse.redirect(new URL(`/#manufakture`, req.nextUrl));
  }
  if (pathname.indexOf('538_landhuisjes_waddinxveen.html') > -1) {
    return NextResponse.redirect(new URL(`/#landhuisjes-waddinxveen`, req.nextUrl));
  }
  if (pathname.indexOf('574_van_gelder_smaak_vallei.html') > -1) {
    return NextResponse.redirect(new URL(`/#van-gelder-smaak-vallei`, req.nextUrl));
  }
  if (pathname.indexOf('574_van_gelder_taste_valley.html') > -1) {
    return NextResponse.redirect(new URL(`/#van-gelder-smaak-vallei`, req.nextUrl));
  }
  if (pathname.indexOf('342_cofco.html') > -1) {
    return NextResponse.redirect(new URL(`/#cofco`, req.nextUrl));
  }
  if (pathname.indexOf('412_worlds_of_food_doha_qatar.html') > -1) {
    return NextResponse.redirect(new URL(`/#worlds-of-food-doha-qatar`, req.nextUrl));
  }
  if (pathname.indexOf('7_kaap_de_goede_hoek.html') > -1) {
    return NextResponse.redirect(new URL(`/#kaap-de-goede-hoek`, req.nextUrl));
  }
  if (pathname.indexOf('84_olympiakwartier.html') > -1) {
    return NextResponse.redirect(new URL(`/#olympiakwartier`, req.nextUrl));
  }
  if (pathname.indexOf('281_bedrijven_werf_de_wieken.html') > -1) {
    return NextResponse.redirect(new URL(`/#bedrijven-werf-de-wieken`, req.nextUrl));
  }
  if (pathname.indexOf('48_westpolder_dorp.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
  if (pathname.indexOf('17_stallinggarage.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
  if (pathname.indexOf('17_parking_garage.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
  if (pathname.indexOf('6_ij_mast.html') > -1) {
    return NextResponse.redirect(new URL(`/#ij-mast`, req.nextUrl));
  }

  //visie

  if (pathname.indexOf('604_greenport_westland_oostland.html') > -1) {
    return NextResponse.redirect(new URL(`/#greenport-westland-oostland`, req.nextUrl));
  }
  if (pathname.indexOf('72_rode_waterparel.html') > -1) {
    return NextResponse.redirect(new URL(`/#rode-waterparel`, req.nextUrl));
  }
  if (pathname.indexOf('85_bergpolder_zuid.html') > -1) {
    return NextResponse.redirect(new URL(`/#bergpolder-zuid`, req.nextUrl));
  }
  if (pathname.indexOf('70_roer_vallei.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
  if (pathname.indexOf('61_campus_hoogvliet.html') > -1) {
    return NextResponse.redirect(new URL(`/#campus-hoogvliet`, req.nextUrl));
  }
  if (pathname.indexOf('66_barendrecht_centrum.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
  if (pathname.indexOf('243_rijnenburg.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
  if (pathname.indexOf('68_westwater_stad.html') > -1) {
    return NextResponse.redirect(new URL(`/#westwater-stad`, req.nextUrl));
  }
  if (pathname.indexOf('475_oregional_park_supermarkt.html') > -1) {
    return NextResponse.redirect(new URL(`/#park-supermarkt-oregional`, req.nextUrl));
  }
  if (pathname.indexOf('475_original_park_supermarket.html') > -1) {
    return NextResponse.redirect(new URL(`/#park-supermarkt-oregional`, req.nextUrl));
  }

  //onderzoek

  if (pathname.indexOf('83_park_supermarkt.html') > -1) {
    return NextResponse.redirect(new URL(`/#park-supermarkt`, req.nextUrl));
  }
  if (pathname.indexOf('471_familie_wonen.html') > -1) {
    return NextResponse.redirect(new URL(`/#familie-wonen`, req.nextUrl));
  }
  if (pathname.indexOf('471_family_living.html') > -1) {
    return NextResponse.redirect(new URL(`/#familie-wonen`, req.nextUrl));
  }
  if (pathname.indexOf('313_greendeal_stadslandbouw.html') > -1) {
    return NextResponse.redirect(new URL(`/#greendeal-stadslandbouw`, req.nextUrl));
  }
  if (pathname.indexOf('313_greendeal_urban_agriculture.html') > -1) {
    return NextResponse.redirect(new URL(`/#greendeal-stadslandbouw`, req.nextUrl));
  }
  if (pathname.indexOf('324_klimaatbestendige_stad.html') > -1) {
    return NextResponse.redirect(new URL(`/#de-klimaatbestendige-stad-2050-en-het-klimaat-spel`, req.nextUrl));
  }
  if (pathname.indexOf('22_kas_en_land.html') > -1) {
    return NextResponse.redirect(new URL(`/#kas-en-land`, req.nextUrl));
  }
  if (pathname.indexOf('22_greenhouse_and_land.html') > -1) {
    return NextResponse.redirect(new URL(`/#kas-en-land`, req.nextUrl));
  }
  if (pathname.indexOf('20_groeien_bloeien.html') > -1) {
    return NextResponse.redirect(new URL(`/#groeien-en-bloeien`, req.nextUrl));
  }
  if (pathname.indexOf('20_growing_blooming.html') > -1) {
    return NextResponse.redirect(new URL(`/#groeien-en-bloeien`, req.nextUrl));
  }
  if (pathname.indexOf('77_water_hectare_stad.html') > -1) {
    return NextResponse.redirect(new URL(`/#water-hectare-stad-is-een-visie-op-bouwen-met-water`, req.nextUrl));
  }
  if (pathname.indexOf('67_pak_huis_waalhaven.html') > -1) {
    return NextResponse.redirect(new URL(`/#economische-contextgoederenvervoer-en-overslag-is-een`, req.nextUrl));
  }
  if (pathname.indexOf('62_deltaworks.html') > -1) {
    return NextResponse.redirect(new URL(`/#delta_works`, req.nextUrl));
  }
  if (pathname.indexOf('64_overijssel.html') > -1) {
    return NextResponse.redirect(new URL(`/#pakhuis-waalhaven`, req.nextUrl));
  }
  if (pathname.indexOf('65_infra_ecologie.html') > -1) {
    return NextResponse.redirect(new URL(`/#infra-ecologie-is-een-onderzoek-naar-de-hinderzones`, req.nextUrl));
  }
  if (pathname.indexOf('52_zilte_proef_tuin.html') > -1) {
    return NextResponse.redirect(new URL(`/#zilte-proeftuin`, req.nextUrl));
  }
  if (pathname.indexOf('52_salt_taste_garden.html') > -1) {
    return NextResponse.redirect(new URL(`/#zilte-proeftuin`, req.nextUrl));
  }
  if (pathname.indexOf('25_flow_food.html') > -1) {
    return NextResponse.redirect(new URL(`/#flow---food`, req.nextUrl));
  }
  if (pathname.indexOf('26_flow_food_city.html') > -1) {
    return NextResponse.redirect(new URL(`/#flow-food-city-is-een-plek-waar-de-toekomstige-natuur`, req.nextUrl));
  }
  if (pathname.indexOf('27_mest_nl.html') > -1) {
    return NextResponse.redirect(new URL(`/#mest---nl`, req.nextUrl));
  }
  if (pathname.indexOf('27_manure_nl.html') > -1) {
    return NextResponse.redirect(new URL(`/#mest---nl`, req.nextUrl));
  }
  if (pathname.indexOf('28_gas_nl.html') > -1) {
    return NextResponse.redirect(new URL(`/#de-nederlandse-economie-drijft-op-de-aardgasbel-uit`, req.nextUrl));
  }
  if (pathname.indexOf('29_water_nl.html') > -1) {
    return NextResponse.redirect(new URL(`/#nederland-drijft-op-water-we-drinken-wassen-transporteren`, req.nextUrl));
  }
  if (pathname.indexOf('30_food_for_thought.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }
  if (pathname.indexOf('78_agenda_rotterdam.html') > -1) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }

  // chinese
  if (pathname.indexOf('321_21271201402001331918208921999423637310342001324515.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#cofco`, req.nextUrl));
  }
  if (pathname.indexOf('345_3913529289303401999030028213452930523572_2281021704.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#worlds-of-food-doha-qatar`, req.nextUrl));
  }
  if (pathname.indexOf('357_20844222533622924066.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#park-supermarkt`, req.nextUrl));
  }
  if (pathname.indexOf('382_2820123460199822230322320.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#kas-en-land`, req.nextUrl));
  }
  if (pathname.indexOf('375_hoogvliet32852215122030323429.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#cohousing-neighbourship`, req.nextUrl));
  }
  if (pathname.indexOf('389_280142116039135216972247824066.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#flow-food-city-is-een-plek-waar-de-toekomstige-natuur`, req.nextUrl));
  }
  if (pathname.indexOf('394_nikola_lenivets_3913529289334022641522253.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn`, req.nextUrl));
  }
  if (pathname.indexOf('392_27969211603913521697.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#flow---food`, req.nextUrl));
  }
  if (pathname.indexOf('367_22269234782247824066208921999432852215122132735758.html') > -1) {
    return NextResponse.redirect(new URL(`/zh-cn#greendeal-stadslandbouw`, req.nextUrl));
  }



  return NextResponse.next();
}