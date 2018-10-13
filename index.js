const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const adminToken = ["admin token here"];

exports.sendLikeNotification = functions.firestore.document('notifications/{docid}').onWrite((change, context) => {
    const payload = {
        notification: {
            title: 'Someone Just Liked Your Post!',
        }
    }

    const data = change.after.data();

    if (data.type == "like") {
        admin.messaging().sendToDevice(data.to, payload)    
        .then(function(response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
    }
})

exports.sendCommentNotification = functions.firestore.document('notifications/{docid}').onWrite((change, context) => {
    const payload = {
        notification: {
            title: 'Someone Just Commented on Your Post!',
        }
    }

    const data = change.after.data();

    if (data.type == "comment") {
        admin.messaging().sendToDevice(data.to, payload)    
        .then(function(response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
    }
})

exports.sendReportNotification = functions.firestore.document('reportLog/{docid}').onWrite((change, context) => {
    const payload = {
        notification: {
            title: 'Someone Just Reported a Post!',
        }
    }

    const data = change.after.data();

    admin.messaging().sendToDevice(adminToken, payload)    
    .then(function(response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
        console.log("Error sending message:", error);
    });
})

exports.checkForBadWords = functions.firestore.document('jod/{docId}').onCreate((change, context) => {
    const payload = {
        notification: {
            title: 'A post has been flagged',
        }
    }

    const data = change.after.data;
    var text = data.text;
    var whitespaces = /\s*(;|$)\s*/;
    var textArray = text.split(whitespaces).toLowerCase();
    
    textArray.forEach(function(element) {
        //separate function to check substring against ProfanityArray
        if (profanityPresent(element)){ //only checks if it's a substring of an element in ProfanityArray
            //sendReportNotification
            admin.messaging().sendToDevice(adminToken, payload);
        }
    });
})

function profanityPresent(element){

    const profString = "2g1c 4r5e 5h1t 5hit a$$ a$$hole a_s_s a2m a54 a55 a55hole acrotomophilia aeolus ahole alabama hot pocket alaskan pipeline anal anal impaler anal leakage analprobe anilingus anus apeshit ar5e areola areole arian arrse arse arsehole aryan ass ass fuck ass fuck ass hole assbag assbandit assbang assbanged assbanger assbangs assbite assclown asscock asscracker asses assface assfaces assfuck assfucker ass-fucker assfukka assgoblin assh0le asshat ass-hat asshead assho1e asshole assholes asshopper ass-jabber assjacker asslick asslicker assmaster assmonkey assmucus assmucus assmunch assmuncher assnigger asspirate ass-pirate assshit assshole asssucker asswad asswhole asswipe asswipes auto erotic autoerotic axwound azazel azz b!tch b00bs b17ch b1tch babeland baby batter baby juice ball gag ball gravy ball kicking ball licking ball sack ball sucking ballbag balls ballsack bampot bang (one's) box bangbros bareback barely legal barenaked barf bastard bastardo bastards bastinado batty boy bawdy bbw bdsm beaner beaners beardedclam beastial beastiality beatch beaver beaver cleaver beaver lips beef curtain beef curtain beef curtains beeyotch bellend bender beotch bescumber bestial bestiality bi+ch biatch big black big breasts big knockers big tits bigtits bimbo bimbos bint birdlock bitch bitch tit bitch tit bitchass bitched bitcher bitchers bitches bitchin bitching bitchtits bitchy black cock blonde action blonde on blonde action bloodclaat bloody bloody hell blow job blow me blow mud blow your load blowjob blowjobs blue waffle blue waffle blumpkin blumpkin bod bodily boink boiolas bollock bollocks bollok bollox bondage boned boner boners bong boob boobies boobs booby booger bookie boong booobs boooobs booooobs booooooobs bootee bootie booty booty call booze boozer boozy bosom bosomy breasts Breeder brotherfucker brown showers brunette action buceta bugger bukkake bull shit bulldyke bullet vibe bullshit bullshits bullshitted bullturds bum bum boy bumblefuck bumclat bummer buncombe bung bung hole bunghole bunny fucker bust a load bust a load busty butt butt fuck butt fuck butt plug buttcheeks buttfuck buttfucka buttfucker butthole buttmuch buttmunch butt-pirate buttplug c.0.c.k c.o.c.k. c.u.n.t c0ck c-0-c-k c0cksucker caca cacafuego cahone camel toe cameltoe camgirl camslut camwhore carpet muncher carpetmuncher cawk cervix chesticle chi-chi man chick with a dick child-fucker chinc chincs chink chinky choad choade choade choc ice chocolate rosebuds chode chodes chota bags chota bags cipa circlejerk cl1t cleveland steamer climax clit clit licker clit licker clitface clitfuck clitoris clitorus clits clitty clitty litter clitty litter clover clamps clunge clusterfuck cnut cocain cocaine coccydynia cock c-o-c-k cock pocket cock pocket cock snot cock snot cock sucker cockass cockbite cockblock cockburger cockeye cockface cockfucker cockhead cockholster cockjockey cockknocker cockknoker Cocklump cockmaster cockmongler cockmongruel cockmonkey cockmunch cockmuncher cocknose cocknugget cocks cockshit cocksmith cocksmoke cocksmoker cocksniffer cocksuck cocksuck cocksucked cocksucked cocksucker cock-sucker cocksuckers cocksucking cocksucks cocksucks cocksuka cocksukka cockwaffle coffin dodger coital cok cokmuncher coksucka commie condom coochie coochy coon coonnass coons cooter cop some wood cop some wood coprolagnia coprophilia corksucker cornhole cornhole corp whore corp whore corpulent cox crabs crack cracker crackwhore crap crappy creampie cretin crikey cripple crotte cum cum chugger cum chugger cum dumpster cum dumpster cum freak cum freak cum guzzler cum guzzler cumbubble cumdump cumdump cumdumpster cumguzzler cumjockey cummer cummin cumming cums cumshot cumshots cumslut cumstain cumtart cunilingus cunillingus cunnie cunnilingus cunny cunt c-u-n-t cunt hair cunt hair cuntass cuntbag cuntbag cuntface cunthole cunthunter cuntlick cuntlick cuntlicker cuntlicker cuntlicking cuntlicking cuntrag cunts cuntsicle cuntsicle cuntslut cunt-struck cunt-struck cus cut rope cut rope cyalis cyberfuc cyberfuck cyberfuck cyberfucked cyberfucked cyberfucker cyberfuckers cyberfucking cyberfucking d0ng d0uch3 d0uche d1ck d1ld0 d1ldo dago dagos dammit damn damned damnit darkie darn date rape daterape dawgie-style deep throat deepthroat deggo dendrophilia dick dick head dick hole dick hole dick shy dick shy dickbag dickbeaters dickdipper dickface dickflipper dickfuck dickfucker dickhead dickheads dickhole dickish dick-ish dickjuice dickmilk dickmonger dickripper dicks dicksipper dickslap dick-sneeze dicksucker dicksucking dicktickler dickwad dickweasel dickweed dickwhipper dickwod dickzipper diddle dike dildo dildos diligaf dillweed dimwit dingle dingleberries dingleberry dink dinks dipship dipshit dirsa dirty dirty pillows dirty sanchez dirty Sanchez div dlck dog style dog-fucker doggie style doggiestyle doggie-style doggin dogging doggy style doggystyle doggy-style dolcett domination dominatrix dommes dong donkey punch donkeypunch donkeyribber doochbag doofus dookie doosh dopey double dong double penetration Doublelift douch3 douche douchebag douchebags douche-fag douchewaffle douchey dp action drunk dry hump duche dumass dumb ass dumbass dumbasses Dumbcunt dumbfuck dumbshit dummy dumshit dvda dyke dykes eat a dick eat a dick eat hair pie eat hair pie eat my ass ecchi ejaculate ejaculated ejaculates ejaculates ejaculating ejaculating ejaculatings ejaculation ejakulate erect erection erotic erotism escort essohbee eunuch extacy extasy f u c k f u c k e r f.u.c.k f_u_c_k f4nny facial fack fag fagbag fagfucker fagg fagged fagging faggit faggitt faggot faggotcock faggots faggs fagot fagots fags fagtard faig faigt fanny fannybandit fannyflaps fannyfucker fanyy fart fartknocker fatass fcuk fcuker fcuking fecal feck fecker feist felch felcher felching fellate fellatio feltch feltcher female squirting femdom fenian fice figging fingerbang fingerfuck fingerfuck fingerfucked fingerfucked fingerfucker fingerfucker fingerfuckers fingerfucking fingerfucking fingerfucks fingerfucks fingering fist fuck fist fuck fisted fistfuck fistfucked fistfucked fistfucker fistfucker fistfuckers fistfuckers fistfucking fistfucking fistfuckings fistfuckings fistfucks fistfucks fisting fisty flamer flange flaps fleshflute flog the log flog the log floozy foad foah fondle foobar fook fooker foot fetish footjob foreskin freex frenchify frigg frigga frotting fubar fuc fuck fuck f-u-c-k fuck buttons fuck hole fuck hole Fuck off fuck puppet fuck puppet fuck trophy fuck trophy fuck yo mama fuck yo mama fuck you fucka fuckass fuck-ass fuck-ass fuckbag fuck-bitch fuck-bitch fuckboy fuckbrain fuckbutt fuckbutter fucked fuckedup fucker fuckers fuckersucker fuckface fuckhead fuckheads fuckhole fuckin fucking fuckings fuckingshitmotherfucker fuckme fuckme fuckmeat fuckmeat fucknugget fucknut fucknutt fuckoff fucks fuckstick fucktard fuck-tard fucktards fucktart fucktoy fucktoy fucktwat fuckup fuckwad fuckwhit fuckwit fuckwitt fudge packer fudgepacker fudge-packer fuk fuker fukker fukkers fukkin fuks fukwhit fukwit fuq futanari fux fux0r fvck fxck gae gai gang bang gangbang gang-bang gang-bang gangbanged gangbangs ganja gash gassy ass gassy ass gay gay sex gayass gaybob gaydo gayfuck gayfuckist gaylord gays gaysex gaytard gaywad gender bender genitals gey gfy ghay ghey giant cock gigolo ginger gippo girl on girl on top girls gone wild git glans goatcx goatse god god damn godamn godamnit goddam god-dam goddammit goddamn goddamned god-damned goddamnit godsdamn gokkun golden shower goldenshower golliwog gonad gonads goo girl gooch goodpoop gook gooks goregasm gringo grope group sex gspot g-spot gtfo guido guro h0m0 h0mo ham flap ham flap hand job handjob hard core hard on hardcore hardcoresex he11 hebe heeb hell hemp hentai heroin herp herpes herpy heshe he-she hircismus hitler hiv ho hoar hoare hobag hoe hoer holy shit hom0 homey homo homodumbshit homoerotic homoey honkey honky hooch hookah hooker hoor hootch hooter hooters hore horniest horny hot carl hot chick hotsex how to kill how to murdep how to murder huge fat hump humped humping hun hussy hymen iap iberian slap inbred incest injun intercourse jack off jackass jackasses jackhole jackoff jack-off jaggi jagoff jail bait jailbait jap japs jelly donut jerk jerk off jerk0ff jerkass jerked jerkoff jerk-off jigaboo jiggaboo jiggerboo jism jiz jiz jizm jizm jizz jizzed jock juggs jungle bunny junglebunny junkie junky kafir kawk kike kikes kill kinbaku kinkster kinky klan knob knob end knobbing knobead knobed knobend knobhead knobjocky knobjokey kock kondum kondums kooch kooches kootch kraut kum kummer kumming kums kunilingus kunja kunt kwif kwif kyke l3i+ch l3itch labia lameass lardass leather restraint leather straight jacket lech lemon party LEN leper lesbian lesbians lesbo lesbos lez lezza/lesbo lezzie lmao lmfao loin loins lolita looney lovemaking lube lust lusting lusty m0f0 m0fo m45terbate ma5terb8 ma5terbate mafugly mafugly make me come male squirting mams masochist massa masterb8 masterbat* masterbat3 masterbate master-bate master-bate masterbating masterbation masterbations masturbate masturbating masturbation maxi mcfagget menage a trois menses menstruate menstruation meth m-fucking mick microphallus middle finger midget milf minge minger missionary position mof0 mofo mo-fo molest mong moo moo foo foo moolie moron mothafuck mothafucka mothafuckas mothafuckaz mothafucked mothafucked mothafucker mothafuckers mothafuckin mothafucking mothafucking mothafuckings mothafucks mother fucker mother fucker motherfuck motherfucka motherfucked motherfucker motherfuckers motherfuckin motherfucking motherfuckings motherfuckka motherfucks mound of venus mr hands muff muff diver muff puff muff puff muffdiver muffdiving munging munter murder mutha muthafecker muthafuckker muther mutherfucker n1gga n1gger naked nambla napalm nappy nawashi nazi nazism need the dick need the dick negro neonazi nig nog nigaboo nigg3r nigg4h";
    
    if (profString.includes(element)) {
        return true;
    }
    else {
        return false;
    }
}