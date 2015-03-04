# Radio X concert Filter
[http://mainstream.radiox.ch/konzerte](http://mainstream.radiox.ch/konzerte)

**As for now this is work in progress**

Parses a html document and returns a sorted json.

Unfortuanetly it's more or less just plain text. Otherwise parsing would be much simpler.

The main goal is to provide a mirror of the original content with filter/sorting/search possibilites.

# Mainstream Regex
[Rubular Regex](http://rubular.com/r/YdWP0NXaZb)

## Test Data
```html
<div id="content">


    <h1>Konzertagenda</h1>

    <p class="">01.02 bondage fairies / the tlark, hirscheneck basel<br class="">01.02 dan michaelson &amp; the coastguards, palace st. gallen<br>
01.02 trampeltier of love, schlachthaus bern<br class="">01.02 uk subs / tv smith, usine&nbsp;genf<br class="">01.02 dj shadow / cut chemist, festival antigel genf<br class="">01.02 tom hickox, festival antigel genf<br class="">02.02 tenacious d / sasquatch, komplex 457 zürich&nbsp;(AUSVERKAUFT!)<br class="">02.02 cold specks / reza dinally, fri-son fribourg<br class="">02.02 monster magnet, les docks lausanne<br class="">02.02 sekuoia, festival antigel genf<br class="">02.02 toumani &amp; sidiki diabaté, festival antigel genf<br class="">02.02 emily jane white / jeff beadle, cafe atlantik freiburg<br class="">03.02 tricky, x-tra zürich<br class="">03.02 cold specks, festival antigel genf<br class="">03.02 trust, festival antigel genf<br class="">04.02 bombino, moods zürich<br>
04.02 tatum rush, zukunft zürich<br>
04.02 necro, isc bern<br class="">04.02 trust / warm graves, bad bonn düdingen<br class="">04.02 tricky, festival antigel genf<br class="">04.02 hundreds, kulturladen konstanz<br>
05.02 satori / canson, zukunt zürich<br class="">05.02 pere ubu, salzhaus winterthur<br>
05.02 trampeltier of love, cardinal schaffhausen<br class="">05.02 trümmer / mint mind, treppenhaus rorschach<br class="">05.02 pop.1280, südpol luzern<br class="">05.02&nbsp;gazelle twin / bernholz, dampfzentrale bern<br class="">05. – 07.02 ear we are festival mit david murray, kasper toeplitz &amp; myriam gourfink – data_noise, lehman ocetet, toktek, keiji haino, main, steamboat switzerland, wolf eyes, joey baron, morishige yasumune, gerald cleaver’s black host, robyn hayward u.a., alte juragarage biel<br class="">05.02 neøv, la parenthèse nyon<br class="">05.02 wild beasts, festival antigel genf<br class="">05.02 bombino, festival antigel genf<br class="">05.02 hundreds / missincat, schmitz kate freiburg i. b.<br class="">06.02 papst &amp; abstinenzler, parterre basel<br class="">06.02 i’m not a band, hirscheneck basel<br class="">06.02 guz, 1. stock münchenstein<br>
06.02 kim brown / silky raven / zebra, zukunft zürich<br class="">06.02 bottled in england, gare de lion wil<br class="">06.02 hundreds, schüür luzern<br class="">06.02 francis francis / cat’s eye, bad bonn düdingen<br>
06.02 combineharvester, sas delémont<br class="">06.02 pere ubu, festival antigel genf<br class="">06.02 tindersticks, festival antigel genf<br>
07.02 labrador city / kollektiv turmstrasse / markus kenel / nico sonne / manuelle musik, zukunft zürich<br>
07.02 nordklang festival mit maskinvåd, hermigervill, get your gun, sekuoia, blaue blume, chorus grant, the new world vulture, hulda, mike sheridan, haaga folk machine, adna, ida wenøe, asynje, lydmor, hermigervill, st. gallen<br>
07.02 skip jensen group / the hands, sedel luzern<br class="">07.02 pere ubu, reitschule bern<br class="">07.02 king pepe &amp; le rex, bad bonn düdingen<br class="">07.02 tv on the radio, festival antigel genf<br>
07.02 combineharvester, stimultania strasbourg<br class="">08.02 bombino, reitschule bern<br>
09.02 orlando julius &amp; the heliocentrics, stall 6 zürich<br class="">09.02 walter salas-humara, el lokal zürich<br class="">10.02 dope body, kaschemme basel<br class="">10.02 novemberdecember, parterre basel<br class="">11.02 d’angelo, kaufleuten zürich<br>
11.02 elena lange, zukunft zürich<br class="">11.02 novemberdecember&nbsp;/ damian lynn,&nbsp;gaswerk winterthur<br class="">11.02 watter / liliacs &amp; champagne / holy sons, rössli @ reitschule bern<br class="">11.02 lydia ainsworth, le romandie lausanne<br class="">12.02 lydia ainsworth / nadine carina, palace st. gallen<br class="">12.02 easy october / nautical north, isc bern<br>
12.02 the paperhead, l’ecurie genf<br class="">13.02 easy october, parterre basel<br class="">13.02 schafe &amp; wölfe, hirscheneck basel<br>
13.02 konono n° 1, moods zürich<br class="">13.02 novemberdecember, kafi für dich zürich<br class="">13.02 alt-j, eishalle deutweg winterthur<br class="">13.02 hush hush, kraftfeld winterthur<br class="">13.02 kummerbuben, reitschule bern<br class="">13.02 spain, cafe mokka thun<br class="">13.02 king pepe &amp; le rex, das o spiez<br class="">13.02 doomenfels / peppone, le bourg lausanne<br class="">13.02 pneu, usine genf<br class="">14.02 alvvays / moon king, viadukt bogen f zürich<br>
14.02 dave eleanor / fabio papa / uom, helsinki klub zürich<br>
14.02 trampeltier of love, bundeshaus zu wiedikon zürich<br class="">14.02 austin lucas / aaron persinger, gaswerk winterthur<br class="">14.02 guz, kaff frauenfeld<br class="">14.02 konono n° 1, dampfzentrale bern<br class="">14.02 the weyers, cafe kairo bern<br>
14.02 jeans for jesus, kofmehl solothurn<br class="">14.02 schafe &amp; wölfe, coq d’or olten<br class="">14.02 pneu, bikini test la chaux-de-fonds<br>
14.02 sterling roswell, the great räng teng teng freiburg i. b.<br class="">14.02 kele / my brightest diamond / sahr / all we are / &nbsp;nimmo, noumatrouff mulhouse<br class="">14.02 yelle, la laiterie strasbourg<br class="">14.02 motorama / the grand bay, la laiterie strasbourg<br>
15.02 konono n° 1, kaschemme basel<br class="">15.02 lenny lashely’s gang of one / jo bergeron, rössli @ reitschule bern<br>
15.02 schafe &amp; wölfe, cafe mokka thun<br class="">15.02 fat white family / the voyeurs, bad bonn düdingen<br class="">15.02 paloma faith, les docks lausanne<br>
15.02 austin lucas, white rabbit freiburg i. b.<br>
16.02 sudden death of stars, podium basel<br class="">16.02 the black keys, hallenstadion zürich (ABGESAGT!)<br class="">16.02 stephen steinbrink, el lokal zürich<br class="">16.02 elliphant, mascotte zürich<br class="">17.02 paloma faith, kaufleuten zürich<br class="">17.02 ennio morricone, hallenstadion zürich<br>
17.02 reks / termanology / edo g &amp; akrobatik, albani winterthur<br class="">18.02 my brightest diamond / tim fite, bogen f zürich<br>
18.02 the do, mascotte zürich<br class="">18.02 heavy trash / sarah mc coy / duck duck grey duck, la laiterie strasbourg<br>
19.02 go!zilla, podium basel<br class="">19.02 the tiger lillies, kaserne basel<br class="">19.02 element of crime, maag halle zürich<br class="">19.02 spain / nadine carina, bogen f zürich<br>
19.02 doomenfels / louis jucker, papiersaal zürich<br>
19.02 widdershins, albani winterthur<br class="">19.02 der nino aus wien, palace st. gallen<br class="">19.02 red city radio / arms aloft / pears, grabenhalle st. gallen<br class="">19.02 junior, loft bern<br>
19.02 jeff beadle, wartesaal bern<br class="">19.02 my brightest diamond / tim fite, bad bonn düdingen<br class="">19.02 jarboe / helene money / alexander hacke &amp; danielle de picciotto, le bourg lausanne<br class="">20.02 nite fields / mystery park, exil zürich<br>
20.02 widderhsins / loreley &amp; me, papiersaal zürich<br>
20.02 men from s.p.e.c.t.r.e., helsinki klub zürich<br class="">20.02 junior / harmen, kraftfeld winterthur<br class="">20.02 kummerbuben, kiff aarau<br class="">20.02 gavlyn &amp; oh blimy / busdriver, reitschule bern<br>
20.02 labrador city, la parenthese nyon<br class="">20.02 mambo kurt, la gravière genf<br>
20.02 bohren &amp; der club of gore, e-werk freiburg i. b.<br class="">21.02 yes i’m very tired now / verveine, papiersaal zürich<br class="">21.02 anatopia / tim und puma mimi, helsinki klub zürich<br>
21.02 bohren &amp; der club of gore, palace st. gallen<br class="">21.02 stahlberger eisenwerk frauenfeld<br class="">21.02 junior, triewbwerk arbon<br class="">21.02 jeans for jesus, kiste club baden<br>
21.02 kummerbuben, schüür luzern<br>
21.02 waxwitches, il casotto lugano<br>
21.02 eldorado fm, coupole biel<br>
21.02 david maranha / helena espvall / larkian, le bourg lausanne<br class="">21.02 anna aaron / don’t kill the beast, bikini test la chaux-de-fonds<br class="">22.02 saint motel, eldorado zürich<br class="">23.02 the kooks / bleachers, les docks lausanne<br class="">24.02 ex hex, hafenkneipe zürich<br>
24.02 waxwitches, horstklub kreuzlingen<br class="">24.02 absolutely free / we are the city, bad bonn düdingen<br class="">25.02 ex hex / monoski, le romandie lausanne<br class="">25.02 jonny greenwood &amp; london contemporary orchestra, festival antigel genf<br>
25.02 waxwitches, mudd club strasbourg<br class="">26.02 the subways, komplex klub zürich<br class="">26.02 mirel wagner, studio force lugano<br class="">26.02 juke joint pimps, cafe kairo bern<br class="">26.02 kinky friedman, mühle hunziken rubigen<br class="">26.02 die liga der gewöhnlichen gentlemen, the great räng teng teng freiburg i. b.<br class="">27.02 kinky friedman, bogen f zürich<br class="">27.02 peace, mascotte zürich<br>
27.02 froth, gonzo zürich<br class="">27.02 mirel wagner, palace st. gallen<br class="">27.02 die liga der gewöhnlichen gentlemen, tap tab schaffhausen<br>
27.02 reverend beat-man / robert möslang / julian sartorius, südpol luzern<br class="">27.02 fatso jetson / yawning man / powder for pigeons, sedel luzern<br class="">27.02 the subways, bierhübeli bern<br>
27.02 rams, cafe mokka thun<br>
28.02 say yes dog, lady bar basel<br class="">28.02 the decemberists, kaufleuten zürich<br class="">28.02 bear’s den, mascotte zürich<br class="">28.02 wendy mcneeill, el lokal zürich<br>
28.02 fai baba, albani winterthur<br>
28.02 busdriver, palace st. gallen<br class="">28.02 laurel halo / monolake / lucrecia dalt / heiko, dampfzentrale bern<br class="">28.02 euzen, cafe mokka thun<br class="">28.02 kummerbuben, les caves biel<br>
28.02 trampeltier of love, kreuz nidau<br class="">28.02 mirel wagner / dear deer, bad bonn düdingen<br class="">28.02 HGich.T, slow club freiburg i. b.</p>
<p class="">01.03 sean rowe, el lokal zürich<br class="">01.03 heavy trash / bloodshot bill / urban junior, fri-son fribourg<br class="">02.03 together pangea, hafenkneipe zürich<br class="">02.03 steve wynn, el lokal zürich<br class="">02.03 frontier ruckus, tuchlaube aarau<br class="">02.03 cult of youth, bad bonn düdingen<br class="">02.03 peace, noumatrouff mulhouse<br class="">03.03 brns / metzger &amp; bauer, le romandie lausanne<br class="">03.03 blonde redhead, usine genf<br>
04.03 the lucid dream / ufo, kaschemme basel<br class="">04.03 brns / reza dinally, salzhaus winterthur<br class="">04.03 baxter dury / marie flore, la laiterie strasbourg<br class="">05.03 metronomy, x-tra zürich<br class="">05.03 kitty, daisy &amp; lewis / the dash, plaza zürich<br>
05.03 murs, exil zürich<br class="">05.03 we were promised jetpacks, gaswerk winterthur<br class="">05.03 brns / end, kiff aarau<br class="">05.03 the meatbodies / the wild guys, le romandie lausanne<br class="">05. – 07.03 between the beats mit pond, hundreds, the/das, brns, team me, laing, carnival youth u.a., burghof lörrach<br class="">06. – 07.03 bscene mit jeans for jesus u.a.<br class="">06.03 mark lanegan band / duke garwood / the faye dunaways, plaza&nbsp;zürich<br>
06.03 jay electronica, rote fabrik zürich<br>
06.03 saalschutz &amp; band, helsinki klub zürich<br class="">06.03 kummerbuben / papst &amp; abstinenzler, bogen f zürich<br class="">06.03 stahlberger, altes kino mels<br class="">06.03 jeans for jesus, schüür luzern<br>
06.03 eldorado fm, kofmehl solothurn<br class="">06.03 metronomy / robbing millions, fri-son fribourg<br class="">06.03 two gallants, les docks lausanne<br>
06.03 fai baba / combineharvester / antenna tony monorail, décal’quai montreux<br class="">07.03 josé gonzalez / olöf arnalds, kaufleuten zürich<br class="">07.03 two gallants / theo verney, rote fabrik zürich<br class="">07.03 laibach, chollerhalle zug<br>
07.03 die aeronauten, kleintheater luzern<br class="">07.03 john j. presley / fai baba, bad bonn düdingen<br>
07.03 jay electronica, les dock lausanne<br class="">08.03 ariel pink, mascotte zürich<br>
08.03 dorit chrysler, helsinki klub zürich<br class="">09.03 evan dando, hafenkneipe zürich<br class="">09.03 archive, x-tra zürich<br>
09.03 lee ronaldo / manuel troller, südpol luzern<br class="">09.03 saint motel, le romandie lausanne<br>
10.03 lee ronaldo and the dust, studio foce lugano<br class="">10.03 soup / spidergawd / coogans bluff, bad bonn düdingen<br class="">10.03 archive,&nbsp;théâtre du léman genf<br class="">11.03 team me / al pride, bogen f zürich<br class="">11.03 soup / spidergawd / coogans, gaswerk winterthur<br class="">11.03 kitty, daisy &amp; lewis / the dash, la laiterie strasbourg<br class="">12.03 manuel stahlberger, parterre basel<br>
12.03 durian brothers / papiro, hek basel<br class="">12.03 rustie, papiersaal zürich<br class="">12.03 joan shelley / yuri member, rote fabrik zürich<br class="">12.03 carnival youth, kafi für dich zürich<br>
12.03 the swamps / anaheim, helsinki klub zürich<br>
12.03 saalschutz, rössli @ reitschule bern<br class="">12.03 team me, saumarkt-theater feldkirch<br>
13.03 lola colt, kinski zürich<br class="">13.03 tv smith, cafe mokka thun<br>
14.03 soko, mascotte zürich<br>
14.03 papiro / the durain brothers, helsinki klub zürich<br class="">14.03 karnivool, salzhaus winterthur<br class="">14.03 doomenfels / mute swimmer, gaswerk winterthur<br>
14.03 larytta / gala, südpol luzern<br>
14.03 rooftop runners, cafe kairo bern<br>
14.03 trampeltier of love, eiger brasserie bern<br class="">14.03 gemma ray / ned collette, cafe mokka thun<br class="">15.03 gemma ray / ned collette, el lokal zürich<br>
17.03 jessica pratt, rote fabrik zürich<br class="">18.03 to kill a king, hinterhof basel<br>
18.03 the lords of altamont / john dear, bogen f zürich<br class="">18.03 katzenjammer, kaufleuten zürich<br class="">18.03 alcoholic faith mission, kiff aarau<br>
18.03 jessica pratt, südpol luzern<br>
19.03 m.o.p., kaserne basel<br class="">19.03 to kill a king, bogen f zürich<br class="">19.03 navel / death of a cheerleader, isc bern<br>
19.03 king pepe &amp; herwig the engine, cafe kairo bern<br class="">19.03 these ghosts, la parenthese nyon<br class="">19.03 glass animals, la laiterie strasbourg<br>
20.03 optimo, palace st. gallen<br>
20.03 eldorado fm, kiff aarau<br class="">20.03 yes i’m very tired now / these ghosts, studio foce lugano<br class="">20.03 king pepe &amp; herwig the engine, café kairo bern<br class="">20.03 kummerbuben, zentrum paul klee bern<br class="">20.03 shield patterns, cafe mokka thun<br class="">21.03 bonafide3000 / mouse dtc, hirscheneck basel<br>
21.03 optimo, hinterhof basel<br class="">21.03 james gruntz, parterre basel<br>
21.03 araabmuzik, exil zürich<br>
21.03 dead meadow / fai baba, stall 6 zürich<br>
21.03 saalschutz &amp; band, helsinki klub zürich<br class="">21.03 mister &amp; mississippi / rocky wood, bogen f zürich<br class="">21.03 bratsch, palace st. gallen<br class="">21.03 these ghosts / cristallin, kiff aarau<br>
21.03 we love machines, reitschule bern<br class="">21.03 kummerbuben, kufa lyss<br>
21.03 eldorado fm, bad bonn düdingen<br class="">21.03 big fox, la parenthese nyon<br class="">22.03 bratsch, el lokal zürich<br class="">22.03 mister &amp; mississippi / rocky wood, ebullition bulle<br class="">23.03 selah sue, les docks lausanne<br>
23.03 dark horses, le romandie lausanne<br class="">24.03 olli schulz, plaza zürich<br>
24.03 dark horses,&nbsp;hafenkneipe zürich<br class="">24.03 selah sue, bierhübeli bern<br>
25.03 cristallin, lady bar basel<br>
25.03 the lords of altamont / lombego surfers, kaserne basel<br>
25.03 oozing wound, bad bonn düdingen<br>
26.03 m4music mit jungle, sizarr, sohn, bilderbuch, sinkane, nneka, camilla sparksss, buvette, is tropical u.a., schiffbau zürich<br>
26.03 stereo total, palace st. gallen<br class="">26.03 kummerbuben, cafe mokka thun<br class="">26.03 oozing wound, usine genf<br>
26.03 the feather, swamp freiburg i. b.<br class="">26.03 clockwork indigo (flatbush zombies &amp; the underarchievers), la laiterie strasbourg<br>
27.03 phon.o, sud basel<br>
27.03 stereo total / hotcha, helsinki klub zürich<br>
27.03 labrador city, club cardinal schaffhausen<br>
27.03 peter kernel / overdrive amp explosion, bad bonn düdingen<br class="">27.03 oozing wound, les caves du manoir martigny<br>
27.03 bad breeding, le romandie lausanne<br class="">27.03 sizarr, schmitz katze freiburg i. b.<br class="">27.03 the dandy warhols, la laiterie strasbourg<br>
28.03 cristallin, diogenes&nbsp;altstätten<br class="">29.03 kummerbuben, cafe mokka thun<br>
30.03 ben kahn, kinski zürich<br class="">31.03 the wombats, x-tra zürich<br>
31.03 grant lee phillips / howe gelb, le romandie lausanne<br class="">31.03 the dandy warhols, les docks lausanne</p>
<p class="">01.04 the dandy warhols, dynamo zürich<br class="">02.04 flatbush zombies / the underarchievers, dynamo zürich<br>
02.04 999 / nasty rumours, gaswerk winterthur<br>
03.04 tory y moi, mascotte zürich<br>
03.04 virginia wing, tap tab schaffhausen<br class="">03.04 stahlberger, schüür luzern<br>
03.04 roy &amp; the devil’s motorcycle / fai baba, studio foce lugano<br class="">03.04 baze, cafe mokka thun<br class="">03.04 ela orleans / scarlett’s fall, bad bonn düdingen<br>
03.04 disco doom / monoski, rocking chair vevey<br class="">03.04 the bronze medal, la parenthese nyon<br>
04.04 bob log III, el lokal zürich<br class="">04.04&nbsp;<a class="" href="http://indie.ch/">indie.ch</a>&nbsp;nachtschicht mit the bronze medal, amboss rampe zürich<br class="">04.04 labrador city, cafe kairo bern<br class="">04.04 dirty blondes, cafe mokka thun<br>
04.04 forever pavot, le romandie lausanne<br>
08.04 the toy dolls, gaswerk winterthur<br>
09.04 the pains of being pure at heart / the drops, rote fabrik zürich<br>
09.04 peter kernel / the paradise bankok mib, bogen f zürich<br class="">09.04 heymoonshaker, kiff aarau<br class="">09.04 the twilight sad, schüür luzern<br>
09.04 the toy dolls, kofmehl solothurn<br class="">09.04 the monochrome set, the great räng teng teng freiburg i. b.<br class="">10.04 the twilight sad, kinski zürich<br>
10.04 egotronic / saalschutz / jeans for jesus, stall 6 zürich<br>
10.04 snakehips, exil zürich<br class="">10.04 von spar / marker starling, salzhaus winterthur<br>
10.04 the elwins, royal baden<br>
10.04 erobique, reitschule bern<br class="">10.04 dan mangan + blacksmith / astral swans, le romandie lausanne<br>
10.04 the toy dolls, usine genf<br class="">11.04 feine sahne fischfilet / brett newski, hirscheneck basel<br>
11.04 the elwins, goldenes fass basel<br class="">11.04 dan mangan + blacksmith, mascotte zürich<br>
11.04 erobique&nbsp;/ nemoy / dj jacques palminger, stall 6 zürich<br>
11.04 labrador city / cristallin, theater im vogelsang altdorf<br>
11.04 egotronic, selig chur<br>
11.04 paper aeroplanes, next stop olten<br>
11.04 eldorado fm, kufa lyss<br class="">11.04 the twilight sad, le lux le locle<br>
11.04 von spar, white rabbit freiburg i. b.<br>
12.04 russian circles / helms alee, rote fabrik zürich<br class="">12.04 godspeed you! black emperor / carla bozulich, les docks lausanne<br class="">13.04 flying lotus, x-tra zürich (ABGESAGT!)<br>
14.04 stahlberger, rote fabrik zürich<br>
14.04 get well soon, palace st. gallen<br>
15.04 shabazz palaces, palace st. gallen<br>
15.04 the dodos, studio foce lugano<br>
15.04 colin stetson / sarah neufeld, bad bonn düdingen<br>
15.04 wovenhand, rocking chair vevey<br>
15.04 citizens, usine genf<br>
16.04 shabazz palaces, rote fabrik zürich<br class="">16.04 a place to bury strangers / zzz, bogen f zürich<br>
16.04 cristallin, la catrina zürich<br>
16.04 wovenhand, kiff aarau<br>
16.04 spaceman spiff, café cava baden<br>
16.04 kate tempest, fri-son fribourg<br class="">16.04 the wave pictures, la parenthese nyon<br>
16.04 the dodos, la gravière genf<br>
16.04 john dear, usine genf<br>
17.04 blockflöte des todes, bogen f zürich<br class="">17.04 dälek, kraftfeld winterthur<br class="">17.04 the noise / zach mathieu, gaswerk winterthur<br class="">17.04 stahlberger, kühltür grosshöchstetten<br>
17.04 spaceman spiff, ono bern<br class="">17.04 abwärts, bad bonn düdingen<br>
17.04 jessica 93, le bourg lausanne<br>
17.04 the wave pictures, swamp freiburg i. b.<br>
18.04 the noise / zach mathieu, hirscheneck basel<br>
18.04 spaceman spiff, lady bar basel<br class="">18.04 against me, dynamo zürich<br>
18.04 moon duo, bogen f zürich<br class="">18.04 abwärts, kammgarn schaffhausen<br class="">18.04 the memories, treppenhaus rorschach<br>
18.04 eldorado fm, schüür luzern<br>
18.04 a place to bury strangers, bad bonn düdingen<br class="">19.04 marianne faithfull / selah sue / emiliana torrini, zénith strasbourg<br>
20.04 karin park, kinski zürich<br class="">20.04 the districts, hafenkneipe zürich<br class="">20.04 deichkind, maag music hall zürich<br>
20.04 eyehategod, gaswerk winterthur<br class="">21.04 the answer, rote fabrik zürich<br class="">21.04 balthazar, les docks lausanne<br class="">22.04 calexico, volkshaus zürich<br>
22.04 jenny wilson, papiersaal zürich<br class="">22.04 balthazar, mascotte zürich<br>
22.04 cosmo sheldrake, cafe kairo bern<br>
22.04 dälek, fri-son fribourg<br>
22.04 richard dawson, bad bonn düdingen<br>
23.04 richard dawson, palace st. gallen<br class="">23.04 distance, light &amp; sky, isc bern<br>
23.04 purity ring, les docks lausanne<br>
23.04 cosmo sheldrake, la gravière genf<br>
24.04 black milk &amp; the nat turner live band, kaserne basel<br>
24.04 richard dawson, 1. stock münchenstein<br>
24.04 purity ring, mascotte zürich<br>
24.04 cosmo sheldrake, stall 6 zürich<br>
24.04 ewert and the two dragons, papiersaal zürich<br>
24.04 eldorado fm, exil zürich<br>
24.04 arborea, le bourg lausanne<br>
25.04 electric wire hustle / catching flies / audio dope, kaserne basel<br class="">25.04 social distortion / jessica hernandez and the deltas / johnny two bags, komplex 457 zürich<br class="">25.04 scott matthew / billie bird, bogen f zürich<br class="">25.04 godspeed you! black emperor, salzhaus winterthur<br class="">25.04 die sterne, palace st. gallen<br class="">25.04 feine sahne fischfilet, rössli @ reitschule bern<br class="">25.04 stiller has, cafe mokka thun<br class="">25.04 angus &amp; julia stone, odyssée lausanne<br>
25.04 black milk &amp; the nat turner live band / aaron “ab” abernathy, rocking chair vevey<br>
26.04 arborea, rössli @ reitschule bern<br class="">26.04 stiller has, cafe mokka thun<br class="">27.04 die sterne, kulturladen konstanz<br class="">28.04 mounties / close talker, rote fabrik zürich<br>
28.04 odesza, exil zürich<br class="">28.04 godspeed you! black emperor, la laiterie strasbourg<br>
29.04 she keeps bees, parterre basel<br class="">29.04 wanda / acapulco stage divers, bogen f zürich<br>
29.04 mono / helen money, exil zürich<br>
29.04 made for chicken robots, zukunft zürich<br>
29.04 odesza, usine genf<br>
30.04 stiller has, kaserne basel<br class="">30.04 wanda, grabenhalle st. gallen<br class="">30.04 stahlberger, schüür luzern<br class="">30.04 mono, fri-son fribourg<br>
30.04 she keeps bees, le romandie lausanne<br>
30.04 ryley walker, le bourg lausanne<br>
30.04 the sadies, l’écurie genf</p>
<p class="">01.05 she keeps bees, palace st. gallen<br>
01.05 the sadies, sedel luzern<br>
01.05 ryley walker, volière luzern<br>
01.05 stahlberger / murphy left, galvanik zug<br>
02.05 eldorado fm, sommercasino basel<br>
02.05 the sadies, el lokal zürich<br>
02.05 stahlberger, royal baden<br class="">02.05 papst &amp; abstinenzler, cafe kairo bern<br class="">03.05 king pepe &amp; le rex, bee-flat bern (15.00 uhr!)<br>
03.05 the sadies, reitschule bern<br>
07.05 screaming females, bad bonn düdingen<br>
08.05 joy wellboy, lady bar basel<br>
08.05 skip &amp; die, selig chur<br>
08 – 10.05 swiss psych fest mit white hills, the monsters, papiro, gnod, gull, koonda holaa, julian sartorius, leon, niton, dimensione, brunosphere, augenwasser u.a., amalgame yverdon<br>
09.05 sara jackson-holman, lady bar basel<br>
09.05 chlyklass, kiff aarau<br>
09.05 skip &amp; die, schüür luzern<br>
09.05 joy wellboy, café kairo bern<br>
09.05 eldorado fm, reitschule bern<br>
10.05 joy wellboy, royal baden<br>
10.05 skip &amp; die, reitschule bern<br>
12.05 alcoholic faith mission, rote fabrik zürich<br>
12.05 trampeltier of love, seebadi luzern<br class="">13.05 vierkanttretlager, bar rossi zürich<br>
13.05 alcoholic faith mission, gare de lion wil<br>
13.05 peter broderick, schüür luzern<br>
13.05 and so i watch you from afar, reitschule bern<br class="">14.05 agnostic front, kiff aarau<br>
14.05 and so i watch you from afar, usine genf<br>
15.05 portico / cristallin, kaserne basel<br>
15.05 ugly duckling, stall 6 zürich<br>
15.05 a grave with no name. s.a.s. delémont<br>
16.05 reverend beat-man, off bar basel<br>
16.05 rocky votolato, exil zürich<br>
16.05 meklit, moods zürich<br>
16.05 ugly duckling, reitschule bern<br class="">17.05 sophie hunger, x-tra zürich<br>
19.05 foxygen, plaza zürich<br class="">19.05 mudhoney / white hills / barton control, kammgarn schaffhausen<br>
19.05 dagobert, dampfzentrale bern<br>
20.05 dagobert, exil zürich<br class="">20.05 mudhoney / white hills / barton control, usine genf<br>
21.05 songhoy blues, stall 6 zürich<br>
21.05 jonas alaska, café cava baden<br class="">21.05 mudhoney / white hills / barton control, chollerhalle zug<br class="">21.05 christine owman, isc bern<br>
22.05 dagobert, palace st. gallen<br class="">22.05 peter licht, schüür luzern<br>
22.05 songhoy blues, le romandie lausanne<br class="">22.05 christine owman, les caves du manoir genf<br>
23.05 r. a. the rugged man, stall 6 zürich<br>
23.05 taylor, the creator, volkshaus zürich<br>
23.05 murder by death, exil zürich<br>
23.05 jonas alaska, oya st. gallen<br class="">23.05 jonas alaska, cafe mokka thun<br class="">23.05 christine owman, amalgame yverdon<br>
23.05 dagobert, schmitz katze freiburg i. b.<br>
26.05 waxahatchee, la laiterie strasbourg<br>
27.05 allah-las, mascotte zürich<br>
27.05 pallbearer, rote fabrik zürich<br class="">27.05 nils frahm, südpol luzern<br>
27.05 trampeltier of love, s11 solothurn<br>
27.05 shlomo, amalgame yverdon<br>
28.05 waxahatchee, rote fabrik zürich<br>
28.05 shlomo, plaza zürich<br>
28.05 agent side grinder, grabenhalle st. gallen<br>
28.05 twin shadow, nordportal baden<br>
28.05 king pepe &amp; le rex, kiff aarau<br>
28.05 the end men, rössli @ reitschule bern<br class="">28. – 30.05 bad bonn kilbi mit sleaford mods, thee oh sees, &nbsp;u.a., düdingen<br>
29.05 ignite, kiff aarau<br>
29.05 gisbert zu knyphausen, schüür luzern<br>
29.05 chlyklass, kofmehl solothurn<br>
29.05 joy wellboy, jazzhaus freiburg i. b.<br>
30.05 agent side grinder, kiff aarau<br>
31.05&nbsp;the slow show, papiersaal zürich</p>
<p class="">01.06 strand of oaks, bogen f zürich<br>
02.06 viet cong / twerps, südpol luzern<br>
02.06 chet faker, la laiterie strasbourg<br>
03.06 aldous harding, usine genf<br>
04.06 aldous harding, parterre basel<br>
04.06 liturgy, bogen f zürich<br>
04.06 astronautalis, kiff aarau<br class="">04.06 the dictators, sedel luzern<br>
04.06 moon duo, la gravière genf<br>
05.06 roisin murphy, kaufleuten zürich<br>
05.06 aldous harding, cafe kairo bern<br>
06.06 aldous harding, treppenhaus rorschach<br>
10.06 blockflöte des todes, rössli @ reitschule bern<br class="">11.06 – 13.06 b-sides festival mit tocotronic, dan deacon, black mountain, dels, liima, kevin morby, mark berube, gazelle twin, king pepe &amp; le rex, la gale u.a. luzern<br>
17.06 death cab for cutie, x-tra zürich<br class="">19. -21.06 southside festival mit noel gallagher’s high flying birds, the notwist, future islands, alt-j, placebo, florence &amp; the machine, olli schulz, band of skulls, the gaslight anthem u.a., neuhausen ob eck<br>
20.06 trampeltier of love, backstube stans<br class="">25. – 28.06 openair st. gallen mit noel gallagher’s high flying birds, the chemical brothers, future islands, placebo, the war on drugs u.a., st. gallen</p>
<p class="">02.07 patti smith performs “horses”, stimmen festival lörrach<br>
06.07 woods, bogen f zürich<br class="">09.- 11.07 openair frauenfeld mit phryme, danny brown, flatbush zombies u.a., frauenfeld<br>
16. – 19.07 gurtenfestival mit patti smith u.a.<br>
17.07 james bay, blue balls festival luzern<br>
22.07 damien rice, blue balls festival luzern<br>
24.07 element of crime, blue balls festival luzern<br>
24.07 mando diao, blue balls festival luzern<br>
25.07 sophie hunger, blue balls festival luzern<br>
25.07 james vincent macmorrow, blue balls festival luzern</p>
<p>12.09 brian ferry, kongresshaus zürich</p>
<p class="">05.10 chilly gonzales &amp; das kaiser quartett, kkl luzern<br class="">12.10 tocotronic, x-tra zürich<br>
20.10 tampeltier of love, moods zürich<br class="">25.10 chilly gonzales &amp; das kaiser quartett, victoria hall genf</p>
<p><em style="line-height: 1.5em;">Alle Daten sind ohne Gewähr, aber natürlich auch nicht frei erfunden, sondern mit bestem Gewissen zusammengesucht. Falls du einen Fehler entdeckst, schick uns bitte eine Mail an mainstream(at)radiox(punkt)ch.</em></p>
<p><em>Für die wichtigsten Agenda-Updates folgt Mainstream-Redaktor Xaver Z auf&nbsp;<a href="http://twitter.com/popbsessen">Twitter</a>.</em></p>
<div id="fb_share_1" style=";width: 55px;" name="fb_share"><div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#appId=125029517579627&amp;xfbml=1"></script><fb:like href="http://mainstream.radiox.ch/konzerte/10133" send="false" layout="button_count" width="55" show_faces="false" font="arial"></fb:like></div>
    <p class="posted">» geändert am 27.2.2015 von xaver z</p>




</div>
```

## Einzelkonzert
### v1
    ^(?<day>(\d{1,2})\.(?<month>\d{1,2})\s(?<artist>[^,]*)(?<venue>.*))$

### v2
    ^(?<day>(\d{2}))\.(?<month>(\d{2}))\s(?<artist>([^,]*))\,(?<venue>.*)$

## Festival
### v1
    ^(?<startday>(\d{2}))[^\d]*(?<endday>(\d{2}))\.(?<month>(\d{2}))\s(?<artist>(.*))[\,](?<venue>.*)$

## Notes

- HTML -> Plain Text
- `<br class>` haben keine Zeilenumbruch

### Find concerts with no newline
Find all `>` followed by a digit:

    ([\>])\d

Find all <br> tags and replace them with a `\n`
    /<br.*\/?>/mg,"\n"
