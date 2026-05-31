"use client";
import { useState, useEffect } from "react";
import { Phone, MapPin, Instagram, MessageCircle, Menu, X, ArrowRight, Clock, Star, ChevronDown, Zap } from "lucide-react";

const R="#C41E3A", G="#D4AF37", BG="#040404", W="#F5F3EE";

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#040404;color:#F5F3EE;overflow-x:hidden;-webkit-font-smoothing:antialiased}
.ffd{font-family:'Bebas Neue',cursive;letter-spacing:.02em}
.ffs{font-family:'Rajdhani',sans-serif}
.ffp{font-family:'Noto Sans Arabic',sans-serif}
[dir=rtl]{text-align:right}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#C41E3A;border-radius:2px}
.nsc{scrollbar-width:none;overflow-x:auto}.nsc::-webkit-scrollbar{display:none}
@keyframes shimmer{0%{background-position:-220% center}100%{background-position:220% center}}
.sg{background:linear-gradient(90deg,#D4AF37,#fffbe8 48%,#D4AF37);background-size:220% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.mtrk{animation:mq 22s linear infinite;display:flex;white-space:nowrap}
@keyframes fb{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(1deg)}}
.fburg{animation:fb 3.8s ease-in-out infinite}
@keyframes pg{0%,100%{box-shadow:0 0 22px rgba(196,30,58,.45)}50%{box-shadow:0 0 55px rgba(196,30,58,.85)}}
.pglw{animation:pg 2.6s ease-in-out infinite}
@keyframes pt{0%{transform:translateY(0);opacity:.65}50%{transform:translateY(-40px);opacity:.3}100%{transform:translateY(-82px);opacity:0}}
.ptcl{animation:pt linear infinite;position:absolute;border-radius:50%;background:#C41E3A;pointer-events:none}
@keyframes hi{from{opacity:0;transform:translateY(44px)}to{opacity:1;transform:translateY(0)}}
.ht1{animation:hi 1.05s cubic-bezier(.16,1,.3,1) .38s both}
.ht2{animation:hi 1.05s cubic-bezier(.16,1,.3,1) .56s both}
.hc{animation:hi .85s cubic-bezier(.16,1,.3,1) .72s both}
.hb{animation:hi .85s cubic-bezier(.16,1,.3,1) .9s both}
.heye{animation:hi .9s cubic-bezier(.16,1,.3,1) .2s both}
.fup{opacity:0;transform:translateY(28px);transition:opacity .78s cubic-bezier(.16,1,.3,1),transform .78s cubic-bezier(.16,1,.3,1)}
.fup.vis{opacity:1;transform:none}
.d1{transition-delay:.12s}.d2{transition-delay:.24s}.d3{transition-delay:.36s}.d4{transition-delay:.48s}
.tgr{text-shadow:0 0 32px rgba(196,30,58,.75),0 0 64px rgba(196,30,58,.4)}
.gr{box-shadow:0 0 32px rgba(196,30,58,.5),0 0 64px rgba(196,30,58,.25)}
.gg{box-shadow:0 0 22px rgba(212,175,55,.4)}
.mc{transition:all .3s cubic-bezier(.16,1,.3,1)}
.mc:hover{transform:translateY(-5px)!important;box-shadow:0 0 32px rgba(196,30,58,.22),0 22px 44px rgba(0,0,0,.6)!important;border-color:rgba(196,30,58,.44)!important}
.uc{transition:all .3s ease}.uc:hover{border-color:rgba(196,30,58,.4)!important;background:#100507!important}
.bl{transition:all .25s ease}.bl:hover{transform:translateY(-2px)!important}
.bgh{background-image:radial-gradient(circle,rgba(196,30,58,.09) 1px,transparent 1px);background-size:22px 22px}
.bgd{background-image:radial-gradient(circle,rgba(255,255,255,.035) 1px,transparent 1px);background-size:28px 28px}
.cb{border:1px solid rgba(196,30,58,.18);outline:1px solid rgba(212,175,55,.055);outline-offset:4px}
@media(max-width:767px){.mob-hide{display:none!important}.mob-1col{grid-template-columns:1fr!important}.mob-2col{grid-template-columns:1fr 1fr!important}.mob-pad{padding:52px 16px!important}.mob-burger{width:180px!important;height:180px!important}.mob-burger-fz{font-size:5rem!important}.mob-badge{top:-10px!important;right:-10px!important;width:52px!important;height:52px!important}}
`;

const TR={
  de:{
    nav:{links:["Speisekarte","Geschichte","Galerie","Kontakt"],ids:["menu","story","gallery","contact"],cta:"Jetzt Bestellen"},
    hero:{eye:"Düsseldorfs legendärste Adresse",l1:"HAUS DER",l2:"HELDEN",sub:"Iranisch · Afghanisch · Superhelden-Niveau",badge:"📍 Kölner Str. 220 · 40227 Düsseldorf",c1:"Speisekarte",c2:"WhatsApp Bestellen",c3:"Route starten",scroll:"Entdecke das Universum"},
    story:{eye:"— Kapitel 01 · Ursprung —",h1:"Wo echte",h2:"HELDEN",h3:"essen gehen",p1:"ARYA – HAUS DER HELDEN ist kein Restaurant. Es ist ein Universum, das du betrittst.",p2:"Im Herzen Düsseldorfs treffen die Aromen Irans und Afghanistans auf die Energie der Superhelden. Jedes Gericht ist eine Legende.",stats:[{n:"30+",l:"Helden-Gerichte"},{n:"2",l:"Kulturen · 1 Küche"},{n:"100%",l:"Original"},{n:"★★★★★",l:"Erlebnis"}]},
    marquee:["HERO BURGER","AFGHAN SPECIALS","IRANIAN CLASSICS","SUPERHERO VIBES","DÜSSELDORF","HAUS DER HELDEN","ARYA","PREMIUM FAST FOOD"],
    menu:{eye:"— Kapitel 02 · Speisekarte —",h1:"DIE HELDEN-",h2:"KARTE",cats:[{id:"burgers",l:"🦸  Hero Burger"},{id:"afghan",l:"🏔  Afghan Specials"},{id:"iranian",l:"🌿  Iranian Classics"},{id:"sides",l:"🍟  Beilagen"},{id:"drinks",l:"🥤  Getränke"}],ob:"Bestellen"},
    feat:{eye:"★  Die Signatur  ★",crown:"LEGENDARY",n1:"IRON FLAME",n2:"BURGER",desc:"Das Original. Double Beef-Patty auf Brioche-Bun, karamellisierte Zwiebeln, geröstete Jalapeños, Avocado-Creme und die berühmte Arya-Geheimsoße. Mit geschmolzenem Cheddar.",price:"14,90 €",cta:"Jetzt Bestellen",chips:["Double Beef Patty","Arya Geheimsoße","Karamell-Zwiebeln","Premium Brioche-Bun"]},
    univ:{eye:"— Kapitel 03 · Das Universum —",h1:"BETRITT",h2:"UNSER UNIVERSUM",cards:[{ic:"⚡",t:"Superhelden-Atmosphäre",d:"Wandmalereien, Comics und pure Energie — jede Ecke erzählt eine Geschichte, die du nie vergisst."},{ic:"🔥",t:"Premium-Zutaten",d:"Täglich frisch. Keine Kompromisse. Nur das Allerbeste für echte Helden."},{ic:"🏆",t:"Originale Rezepte",d:"Generationen alte Geheimnisse aus Iran und Afghanistan — neu interpretiert, niemals vergessen."},{ic:"📸",t:"100% Instagrammable",d:"Jeder Burger, jeder Moment, jeder Winkel — gemacht für dein Feed und deine Erinnerungen."}]},
    gal:{eye:"— Kapitel 04 · Galerie —",h1:"VISUELLE",h2:"LEGENDEN",cells:[{e:"🔥",l:"Signature Burger",s:"Foto folgt bald"},{e:"⚡",l:"Restaurant Interior",s:"Foto folgt bald"},{e:"🏔",l:"Afghan Special",s:"Foto folgt bald"},{e:"🦸",l:"Hero Atmosphäre",s:"Foto folgt bald"},{e:"🌿",l:"Iranian Classic",s:"Foto folgt bald"},{e:"★",l:"Helden-Erlebnis",s:"Foto folgt bald"}]},
    contact:{eye:"— Kapitel 05 · Finde uns —",h1:"KOMM ZU",h2:"DEN HELDEN",lbl:{addr:"Adresse",ph:"Telefon",ig:"Instagram",hrs:"Öffnungszeiten"},hours:[{d:"Mo – Fr",h:"11:00 – 22:00 Uhr"},{d:"Sa – So",h:"11:00 – 23:00 Uhr"}],mapCta:"Route in Google Maps öffnen"},
    footer:{tl:"Düsseldorfs Superhelden-Restaurant",r:"© 2025 ARYA – HAUS DER HELDEN. Alle Rechte vorbehalten.",m:"Für echte Helden gemacht ⚡"},
    mob:{wa:"Bestellen",call:"Anrufen",route:"Route"},
    badge:{popular:"★ Beliebt",hot:"🔥 Scharf",new:"NEU",special:"★ Special",vegan:"🌿 Vegan"},
  },
  fa:{
    nav:{links:["منو","داستان","گالری","تماس"],ids:["menu","story","gallery","contact"],cta:"سفارش دهید"},
    hero:{eye:"افسانه‌ای‌ترین رستوران دوسلدورف",l1:"خانه",l2:"قهرمانان",sub:"ایرانی · افغانی · در سطح ابرقهرمانان",badge:"📍 کلنر اشتراسه ۲۲۰ · دوسلدورف",c1:"مشاهده منو",c2:"سفارش واتساپ",c3:"مسیریابی",scroll:"جهان را کشف کن"},
    story:{eye:"— فصل ۰۱ · خاستگاه —",h1:"جایی که قهرمانان",h2:"واقعی",h3:"غذا می‌خورند",p1:"آریا – خانه قهرمانان یک رستوران نیست. جهانی است که وارد آن می‌شوی.",p2:"در قلب دوسلدورف، عطر ایران و افغانستان با انرژی ابرقهرمانان در هم می‌آمیزد. هر غذا یک افسانه است.",stats:[{n:"+۳۰",l:"غذای قهرمانی"},{n:"۲",l:"فرهنگ · ۱ آشپزخانه"},{n:"۱۰۰٪",l:"اصیل"},{n:"★★★★★",l:"تجربه"}]},
    marquee:["برگر قهرمان","ویژه افغانی","کلاسیک ایرانی","SUPERHERO VIBES","دوسلدورف","خانه قهرمانان","آریا","غذای ممتاز"],
    menu:{eye:"— فصل ۰۲ · منو —",h1:"کارت",h2:"قهرمانان",cats:[{id:"burgers",l:"🦸  برگر قهرمان"},{id:"afghan",l:"🏔  ویژه افغانی"},{id:"iranian",l:"🌿  کلاسیک ایرانی"},{id:"sides",l:"🍟  پیش‌غذا"},{id:"drinks",l:"🥤  نوشیدنی"}],ob:"سفارش"},
    feat:{eye:"★  امضای ما  ★",crown:"افسانه‌ای",n1:"آیرون فلیم",n2:"برگر",desc:"اصل اصیل. دو لایه گوشت گاو روی نان بریوش، پیاز کاراملی، جالاپنیو برشته و سس مخفی آریا. با چدار ذوب شده سرو می‌شود.",price:"۱۴٫۹۰ یورو",cta:"همین الان سفارش بده",chips:["دو لایه گوشت گاو","سس مخفی آریا","پیاز کاراملی","بریوش ویژه"]},
    univ:{eye:"— فصل ۰۳ · جهان ما —",h1:"وارد",h2:"جهان ما شو",cards:[{ic:"⚡",t:"فضای ابرقهرمانی",d:"نقاشی‌های دیواری، کمیک‌ها و انرژی خالص — هر گوشه داستانی دارد که هرگز فراموش نمی‌کنی."},{ic:"🔥",t:"مواد اولیه برتر",d:"هر روز تازه تحویل. بدون سازش. فقط بهترین برای قهرمانان واقعی."},{ic:"🏆",t:"دستورالعمل اصیل",d:"اسرار نسل‌های قدیم از ایران و افغانستان — با تفسیری نو، هرگز فراموش نشده."},{ic:"📸",t:"۱۰۰٪ قابل اشتراک",d:"هر برگر، هر لحظه — ساخته شده برای فید و خاطرات شما."}]},
    gal:{eye:"— فصل ۰۴ · گالری —",h1:"افسانه‌های",h2:"تصویری",cells:[{e:"🔥",l:"برگر امضایی",s:"عکس به زودی"},{e:"⚡",l:"داخل رستوران",s:"عکس به زودی"},{e:"🏔",l:"ویژه افغانی",s:"عکس به زودی"},{e:"🦸",l:"فضای قهرمانی",s:"عکس به زودی"},{e:"🌿",l:"کلاسیک ایرانی",s:"عکس به زودی"},{e:"★",l:"تجربه قهرمانی",s:"عکس به زودی"}]},
    contact:{eye:"— فصل ۰۵ · پیدایمان کن —",h1:"نزد",h2:"قهرمانان بیا",lbl:{addr:"آدرس",ph:"تلفن",ig:"اینستاگرام",hrs:"ساعات کاری"},hours:[{d:"دوشنبه – جمعه",h:"۱۱:۰۰ – ۲۲:۰۰"},{d:"شنبه – یکشنبه",h:"۱۱:۰۰ – ۲۳:۰۰"}],mapCta:"در گوگل مپس باز کن"},
    footer:{tl:"رستوران ابرقهرمانان دوسلدورف",r:"© ۲۰۲۵ آریا – خانه قهرمانان. تمام حقوق محفوظ است.",m:"ساخته شده برای قهرمانان واقعی ⚡"},
    mob:{wa:"سفارش",call:"تماس",route:"مسیر"},
    badge:{popular:"★ محبوب",hot:"🔥 تند",new:"جدید",special:"★ ویژه",vegan:"🌿 وگان"},
  },
};

const MENU=[
  {id:1,cat:"burgers",e:"🔥",b:"popular",n:{de:"Iron Flame Burger",fa:"آیرون فلیم برگر"},d:{de:"Double Beef-Patty, Arya-Geheimsoße, karamellisierte Zwiebeln, Cheddar, Jalapeños",fa:"دو لایه گوشت گاو، سس مخفی آریا، پیاز کاراملی، چدار، جالاپنیو"},p:"14,90"},
  {id:2,cat:"burgers",e:"⚡",b:"hot",n:{de:"Thunder Smash Burger",fa:"تاندر اسمش برگر"},d:{de:"Smashed Beef, Bacon-Crisp, BBQ-Soße, Smoke-Cheddar, Gurken-Relish",fa:"گوشت له‌شده، بیکن ترد، سس باربیکیو، چدار دودی، خیار ترشی"},p:"13,90"},
  {id:3,cat:"burgers",e:"💚",b:"special",n:{de:"Hulk Stack Burger",fa:"هالک استک برگر"},d:{de:"Triple Beef-Patty, Avocado-Guacamole, Jalapeños, Wasabi-Mayo",fa:"سه لایه گوشت، گواکامولی، جالاپنیو، مایونز واسابی"},p:"16,90"},
  {id:4,cat:"burgers",e:"🛡️",b:"new",n:{de:"Red Shield Burger",fa:"رد شیلد برگر"},d:{de:"Classic Beef, Romaine-Salat, Tomate, rote Zwiebeln, Thousand-Island",fa:"گوشت کلاسیک، کاهو، گوجه، پیاز قرمز"},p:"11,90"},
  {id:5,cat:"burgers",e:"🕸️",b:"hot",n:{de:"Widow Fire Burger",fa:"ویدو فایر برگر"},d:{de:"Beef, Sriracha-Butter, geröstete Paprika, Chimichurri, Rucola",fa:"گوشت گاو، کره سریراچا، فلفل برشته، چیمیچوری"},p:"13,50"},
  {id:6,cat:"burgers",e:"🦇",b:"special",n:{de:"Dark Knight Burger",fa:"دارک نایت برگر"},d:{de:"Schwarzes Brioche-Bun, Double Beef, Trüffelsoße, Gruyère, Pilze",fa:"نان مشکی، دو لایه گوشت، سس دنبلان، گرویر، قارچ"},p:"15,90"},
  {id:7,cat:"burgers",e:"🕷️",b:"popular",n:{de:"Spider Crunch Burger",fa:"اسپایدر کرانچ برگر"},d:{de:"Crispy Chicken, Chipotle, Mango-Chutney, Coleslaw, Jalapeño-Rings",fa:"مرغ ترد، چیپوتله، چاتنی انبه، کلسلا"},p:"12,90"},
  {id:8,cat:"burgers",e:"⭐",b:null,n:{de:"Captain Crispy Burger",fa:"کاپیتان کریسپی برگر"},d:{de:"Paniertes Chicken, Dijon-Senf, Gewürzgurken, Buttermilch-Soße",fa:"مرغ پانه‌شده، خردل دیژون، خیار شور"},p:"12,50"},
  {id:9,cat:"afghan",e:"🍚",b:"popular",n:{de:"Kabuli Palau",fa:"قابلی پلو"},d:{de:"Reistopf mit Lammfleisch, Rosinen, Karotten, Kardamom",fa:"پلوی سنتی با گوشت بره، کشمش، هویج و هل"},p:"13,90"},
  {id:10,cat:"afghan",e:"🥟",b:"special",n:{de:"Mantu Teigtaschen",fa:"منتو"},d:{de:"Gedämpfte Teigtaschen mit Rindfleisch, Tomatensoße, Joghurt",fa:"دمپلینگ بخاری با گوشت گاو، سس گوجه، ماست"},p:"11,90"},
  {id:11,cat:"afghan",e:"🍖",b:"popular",n:{de:"Chapli Kebab",fa:"چپلی کباب"},d:{de:"Hackfleisch-Patty, Granatapfelkerne, Koriander, Fladenbrot",fa:"گوشت چرخ‌کرده، دانه‌های انار، گشنیز، نان"},p:"12,90"},
  {id:12,cat:"afghan",e:"🫓",b:"vegan",n:{de:"Bolani",fa:"بولانی"},d:{de:"Knuspriges Fladenbrot mit Kartoffeln, Lauch, grüner Chili",fa:"نان ترد با سیب‌زمینی، تره فرنگی، فلفل سبز"},p:"7,90"},
  {id:13,cat:"iranian",e:"🍢",b:"popular",n:{de:"Chelow Kebab Koobideh",fa:"چلو کباب کوبیده"},d:{de:"Safranreis mit Hackfleischspieß, Grilltomate, Butter",fa:"برنج زعفرانی با کباب کوبیده، گوجه کبابی، کره"},p:"14,90"},
  {id:14,cat:"iranian",e:"🍗",b:"special",n:{de:"Joojeh Kebab",fa:"جوجه کباب"},d:{de:"Safran-Hühnchen vom Grill, Safranreis, Zitrone, Sumach",fa:"مرغ زعفرانی، برنج زعفرانی، لیمو، سماق"},p:"13,90"},
  {id:15,cat:"iranian",e:"🌿",b:"popular",n:{de:"Ghormeh Sabzi",fa:"قورمه سبزی"},d:{de:"Kräutereintopf mit Lammfleisch, roten Bohnen, Limetten",fa:"خورشت سبزی با گوشت بره، لوبیا، لیمو عمانی"},p:"12,90"},
  {id:16,cat:"iranian",e:"❤️",b:"special",n:{de:"Fesenjan",fa:"فسنجان"},d:{de:"Hähnchen in Granatapfel-Walnuss-Sud, Safranreis",fa:"مرغ با خورشت انار-گردو، برنج زعفرانی"},p:"13,50"},
  {id:17,cat:"sides",e:"🍟",b:null,n:{de:"Hero Fries",fa:"سیب‌زمینی قهرمان"},d:{de:"Knusprige Pommes mit Arya-Gewürzmischung",fa:"سیب‌زمینی ترد با ادویه آریا"},p:"4,50"},
  {id:18,cat:"sides",e:"🧅",b:"popular",n:{de:"Onion Rings Supreme",fa:"حلقه پیاز سوپریم"},d:{de:"Panierte Zwiebelringe mit Chipotle-Dip",fa:"حلقه‌های پیاز با سس چیپوتله"},p:"5,50"},
  {id:19,cat:"sides",e:"🥗",b:null,n:{de:"Arya Coleslaw",fa:"کلسلا آریا"},d:{de:"Hausgemachter Krautsalat mit Granatapfeldressing",fa:"سالاد کلم با سس انار"},p:"3,50"},
  {id:20,cat:"drinks",e:"🥛",b:"special",n:{de:"Doogh Arya",fa:"دوغ آریا"},d:{de:"Hausgemachtes Joghurtgetränk mit Minze, Rosenblüten",fa:"دوغ خانگی با نعناع و گل رز"},p:"3,90"},
  {id:21,cat:"drinks",e:"🍋",b:null,n:{de:"Limonade hausgemacht",fa:"لیموناد خانگی"},d:{de:"Original · Minze · Ingwer — frisch gepresst",fa:"اصل · نعناع · زنجبیل — تازه"},p:"4,50"},
  {id:22,cat:"drinks",e:"🥤",b:"popular",n:{de:"Arya Energy Shake",fa:"شیک انرژی آریا"},d:{de:"Mango · Ananas · Kokosmilch · Safran",fa:"انبه · آناناس · شیر نارگیل · زعفران"},p:"5,90"},
];

const BS={popular:{c:"#fbbf24",bg:"rgba(251,191,36,.12)",b:"rgba(251,191,36,.28)"},hot:{c:"#f87171",bg:"rgba(248,113,113,.12)",b:"rgba(248,113,113,.28)"},new:{c:"#34d399",bg:"rgba(52,211,153,.12)",b:"rgba(52,211,153,.28)"},special:{c:"#a78bfa",bg:"rgba(167,139,250,.12)",b:"rgba(167,139,250,.28)"},vegan:{c:"#86efac",bg:"rgba(134,239,172,.12)",b:"rgba(134,239,172,.28)"}};
function Badge({type,lang}){
  if(!type)return null;
  const s=BS[type];if(!s)return null;
  return <span style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100,border:"1px solid "+s.b,color:s.c,background:s.bg,letterSpacing:"0.06em",whiteSpace:"nowrap",display:"inline-block"}}>{TR[lang].badge[type]}</span>;
}

function AryaLogo({sz=80}){
  const bw=Math.max(2,(sz*0.038)|0);
  const ib=Math.max(1,(sz*0.026)|0);
  const padX=Math.max(3,(sz*0.062)|0);
  const padTop=Math.max(3,(sz*0.062)|0);
  const padBot=Math.max(2,(sz*0.036)|0);
  const gap=Math.max(2,(sz*0.038)|0);
  const hausH=Math.max(8,(sz*0.194)|0);
  const innerW=sz-2*bw-2*padX;
  const aryaFz=(sz*0.44)|0;
  const hausFz=(hausH*0.82)|0;
  return(
    <div style={{width:sz,height:sz,background:"#C41E3A",border:bw+"px solid white",display:"flex",flexDirection:"column",alignItems:"stretch",paddingTop:padTop+"px",paddingLeft:padX+"px",paddingRight:padX+"px",paddingBottom:padBot+"px",gap:gap+"px",flexShrink:0,boxSizing:"border-box",boxShadow:"0 0 22px rgba(196,30,58,.35)"}}>
      <div style={{border:ib+"px solid white",display:"flex",alignItems:"center",justifyContent:"center",flex:"1 1 0",minHeight:0}}>
        <span className="ffd" style={{fontSize:aryaFz+"px",color:"white",lineHeight:1,letterSpacing:"0.015em"}}>ARYA</span>
      </div>
      <svg width={innerW} height={hausH} style={{display:"block",flexShrink:0,overflow:"visible"}}>
        <text fontFamily={"'Bebas Neue',cursive"} fill="white" fontSize={hausFz} textLength={innerW} lengthAdjust="spacingAndGlyphs" x="0" y={hausH}>HAUS DER HELDEN</text>
      </svg>
    </div>
  );
}

const PTCLS=[
  {l:"10%",b:"15%",w:2.5,o:.7,du:"4.2s",de:"0s"},{l:"25%",b:"35%",w:1.8,o:.5,du:"3.7s",de:"0.9s"},
  {l:"42%",b:"10%",w:3,o:.6,du:"5.1s",de:"1.5s"},{l:"58%",b:"40%",w:1.5,o:.4,du:"3.9s",de:"0.3s"},
  {l:"70%",b:"22%",w:2.2,o:.65,du:"4.6s",de:"1.1s"},{l:"82%",b:"8%",w:1.7,o:.45,du:"3.4s",de:"2.1s"},
  {l:"18%",b:"52%",w:2,o:.55,du:"5.5s",de:"0.6s"},{l:"88%",b:"46%",w:1.4,o:.38,du:"4s",de:"1.7s"},
];
export default function Page(){
  const[lang,setLang]=useState("de");
  const[cat,setCat]=useState("burgers");
  const[navOpen,setNavOpen]=useState(false);
  const[scrolled,setScrolled]=useState(false);
  const T=TR[lang],rtl=lang==="fa",ff=rtl?"'Noto Sans Arabic',sans-serif":"'Rajdhani',sans-serif";

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>55);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("vis")}),{threshold:.08,rootMargin:"0px 0px -4% 0px"});
    const t=setTimeout(()=>document.querySelectorAll(".fup").forEach(el=>{el.classList.remove("vis");io.observe(el);}),90);
    return()=>{clearTimeout(t);io.disconnect();};
  },[lang,cat]);

  const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setNavOpen(false);};
  const filtered=MENU.filter(m=>m.cat===cat);

  const s0={background:"none",border:"none",cursor:"pointer",fontFamily:ff,padding:0};
  const aBtn=(href,bg,extra={})=>({display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:bg,color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none",fontFamily:ff,...extra});

  return(
  <div dir={rtl?"rtl":"ltr"} style={{fontFamily:ff,background:BG,color:W,overflowX:"hidden",minHeight:"100vh"}}>
  <style dangerouslySetInnerHTML={{__html:CSS}}/>

  {/* ━━━ NAV ━━━ */}
  <nav style={{position:"sticky",top:0,zIndex:50,background:scrolled?"rgba(5,5,5,.96)":"transparent",backdropFilter:scrolled?"blur(24px)":"none",borderBottom:scrolled?"1px solid rgba(196,30,58,.15)":"none",transition:"all .4s",boxShadow:scrolled?"0 4px 40px rgba(0,0,0,.7)":"none"}}>
    <div style={{maxWidth:1160,margin:"0 auto",padding:"0 24px",height:92,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
      <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{...s0,flexShrink:0,lineHeight:0}}>
        <AryaLogo sz={80}/>
      </button>
      <div className="mob-hide" style={{display:"flex",gap:24,alignItems:"center"}}>
        {T.nav.links.map((l,i)=>(
          <button key={i} onClick={()=>go(T.nav.ids[i])} style={{...s0,color:"rgba(245,243,238,.55)",fontSize:13,fontWeight:600,letterSpacing:"0.04em",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=R} onMouseLeave={e=>e.currentTarget.style.color="rgba(245,243,238,.55)"}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
        <button onClick={()=>setLang(l=>l==="de"?"fa":"de")} style={{padding:"5px 13px",border:"1px solid rgba(196,30,58,.28)",borderRadius:100,background:"none",cursor:"pointer",color:"rgba(245,243,238,.65)",fontSize:11,fontWeight:700,fontFamily:ff,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.65)";e.currentTarget.style.color=W}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.28)";e.currentTarget.style.color="rgba(245,243,238,.65)"}}>
          {lang==="de"?"🇩🇪 DE ⇄ FA 🇮🇷":"🇮🇷 FA ⇄ DE 🇩🇪"}
        </button>
        <a href="https://wa.me/4917642573274" className="gr bl mob-hide" style={aBtn("https://wa.me/4917642573274",R,{flexShrink:0})} onMouseEnter={e=>e.currentTarget.style.background="#A01630"} onMouseLeave={e=>e.currentTarget.style.background=R}>
          <MessageCircle size={14}/>{T.nav.cta}
        </a>
      </div>
    </div>
  </nav>

  {/* ━━━ HERO ━━━ */}
  <div id="hero" style={{position:"relative",minHeight:"94vh",display:"flex",alignItems:"center",overflow:"hidden",background:"radial-gradient(ellipse 80% 80% at 70% 40%,#100206 0%,#050505 100%)",clipPath:"polygon(0 0,100% 0,100% 93%,0 100%)"}}>
    <div className="bgh" style={{position:"absolute",inset:0,opacity:.55}}/>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 45% at 88% 50%,rgba(196,30,58,.10) 0%,transparent 70%),radial-gradient(ellipse 40% 55% at 12% 60%,rgba(196,30,58,.07) 0%,transparent 70%)"}}/>
    <div style={{position:"absolute",top:"-20%",bottom:"-20%",width:"1.5px",left:"62%",background:"linear-gradient(to bottom,transparent,rgba(196,30,58,.38) 40%,rgba(196,30,58,.38) 60%,transparent)",transform:"rotate(11deg)",transformOrigin:"top center",pointerEvents:"none"}}/>
    <div style={{position:"absolute",top:0,right:0,width:450,height:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.18) 0%,transparent 68%)",filter:"blur(50px)",pointerEvents:"none"}}/>
    {PTCLS.map((p,i)=>(
      <div key={i} className="ptcl" style={{left:p.l,bottom:p.b,width:p.w+"px",height:p.w+"px",opacity:p.o,animationDuration:p.du,animationDelay:p.de}}/>
    ))}
    <div style={{position:"relative",zIndex:10,maxWidth:1160,width:"100%",padding:"100px 24px 80px",margin:"0 auto"}}>
      <div className="heye" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div style={{height:1,width:40,background:R,flexShrink:0}}/>
        <span style={{color:R,fontSize:11,fontWeight:700,letterSpacing:"0.34em",textTransform:"uppercase"}}>{T.hero.eye}</span>
      </div>
      <div className="ffd" style={{lineHeight:.88,marginBottom:14}}>
        <div className="ht1" style={{display:"block",color:W,fontSize:"clamp(3.8rem,10vw,8.5rem)"}}>{T.hero.l1}</div>
        <div className="ht2 tgr" style={{display:"block",color:R,fontSize:"clamp(4.5rem,13vw,10.5rem)"}}>{T.hero.l2}</div>
      </div>
      <div className="hc">
        <p style={{color:"rgba(245,243,238,.5)",letterSpacing:"0.18em",marginBottom:6,fontSize:"clamp(13px,2.5vw,17px)",fontWeight:300}}>{T.hero.sub}</p>
        <div style={{display:"flex",alignItems:"center",gap:6,color:"rgba(245,243,238,.38)",fontSize:12}}>
          <MapPin size={12} style={{color:R,flexShrink:0}}/><span>{T.hero.badge}</span>
        </div>
      </div>
      <div className="hb" style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:28}}>
        <button onClick={()=>go("menu")} className="gr" style={{...s0,display:"inline-flex",alignItems:"center",gap:8,padding:"12px 26px",background:R,color:"white",borderRadius:100,fontSize:14,fontWeight:700,transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.background="#A01630";e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.background=R;e.currentTarget.style.transform="translateY(0)"}}>
          {T.hero.c1}<ArrowRight size={16}/>
        </button>
        <a href="https://wa.me/4917642573274" style={{...aBtn("https://wa.me/4917642573274","rgba(18,18,18,.95)",{border:"1px solid rgba(255,255,255,.1)",transition:"all .25s"})}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.4)";e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.transform="translateY(0)"}}>
          <MessageCircle size={16} style={{color:"#25D366"}}/>{T.hero.c2}
        </a>
        <a href="https://maps.app.goo.gl/S6LkGJ9oc5PYYGco6?g_st=ic" style={{...aBtn(null,"transparent",{border:"1px solid rgba(255,255,255,.1)",color:"rgba(245,243,238,.55)",transition:"all .25s"})}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.22)";e.currentTarget.style.color="rgba(245,243,238,.85)";e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(245,243,238,.55)";e.currentTarget.style.transform="translateY(0)"}}>
          <MapPin size={16}/>{T.hero.c3}
        </a>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,marginTop:40,opacity:.5}}>
        <span style={{fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase"}}>{T.hero.scroll}</span>
        <ChevronDown size={18} style={{color:R,animation:"fb 1.7s ease-in-out infinite"}}/>
      </div>
    </div>
  </div>

  {/* ━━━ MARQUEE ━━━ */}
  <div style={{position:"relative",overflow:"hidden",background:R,padding:"12px 0",zIndex:5}}>
    <div style={{overflow:"hidden"}}>
      <div className="mtrk">
        {[...T.marquee,...T.marquee].map((w,i)=>(
          <span key={i} className="ffd" style={{fontSize:18,color:"white",padding:"0 28px",opacity:.9,flexShrink:0}}>{w}<span style={{opacity:.38,fontSize:13,marginLeft:8}}>✦</span></span>
        ))}
      </div>
    </div>
  </div>

  {/* ━━━ STORY ━━━ */}
  <div id="story" style={{position:"relative",padding:"80px 24px",background:"#070707",overflow:"hidden"}}>
    <div className="bgd" style={{position:"absolute",inset:0,opacity:.45}}/>
    <div style={{position:"absolute",top:0,right:0,width:450,height:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.065) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none"}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto"}}>
      <div className="fup" style={{textAlign:"center",marginBottom:4}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.38em",textTransform:"uppercase",color:"rgba(196,30,58,.65)"}}>{T.story.eye}</span>
      </div>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center",marginTop:30}}>
        <div className="fup">
          <div className="ffd" style={{lineHeight:.88}}>
            <span style={{display:"block",color:"rgba(245,243,238,.75)",fontSize:"clamp(2rem,5vw,4.2rem)"}}>{T.story.h1}</span>
            <span className="sg" style={{display:"block",fontSize:"clamp(2.8rem,8vw,6.8rem)"}}>{T.story.h2}</span>
            <span style={{display:"block",color:"rgba(245,243,238,.5)",fontSize:"clamp(1.8rem,4.5vw,3.8rem)"}}>{T.story.h3}</span>
          </div>
        </div>
        <div className="fup d1">
          <p style={{fontSize:17,fontWeight:500,lineHeight:1.7,color:"rgba(245,243,238,.85)",marginBottom:14}}>{T.story.p1}</p>
          <p style={{fontSize:14,lineHeight:1.8,color:"rgba(245,243,238,.52)"}}>{T.story.p2}</p>
          <div style={{height:1,width:56,background:"linear-gradient(to right,rgba(196,30,58,.5),transparent)",marginTop:20}}/>
        </div>
      </div>
      <div className="mob-2col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:44}}>
        {T.story.stats.map((s,i)=>(
          <div key={i} className={"fup cb d"+(i+1)+" uc"} style={{background:"#0e0e0e",borderRadius:14,padding:"22px 14px",textAlign:"center",cursor:"default"}}>
            <div className="ffd" style={{fontSize:"clamp(22px,3.5vw,34px)",color:R,lineHeight:1}}>{s.n}</div>
            <div style={{fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(245,243,238,.38)",fontWeight:700,marginTop:6}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ━━━ MENU ━━━ */}
  <div id="menu" style={{position:"relative",padding:"80px 24px",background:"#060606",overflow:"hidden"}}>
    <div className="bgh" style={{position:"absolute",inset:0,opacity:.28}}/>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,#040404,transparent,#040404)",pointerEvents:"none"}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto"}}>
      <div className="fup" style={{textAlign:"center",marginBottom:44}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.38em",textTransform:"uppercase",color:"rgba(196,30,58,.65)",display:"block",marginBottom:12}}>{T.menu.eye}</span>
        <div className="ffd" style={{lineHeight:.88}}>
          <span style={{display:"block",color:W,fontSize:"clamp(2.5rem,7vw,5.5rem)"}}>{T.menu.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(2.5rem,7vw,5.5rem)"}}>{T.menu.h2}</span>
        </div>
      </div>
      <div className="nsc" style={{display:"flex",gap:8,paddingBottom:8,marginBottom:24}}>
        {T.menu.cats.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} style={{whiteSpace:"nowrap",flexShrink:0,padding:"10px 18px",borderRadius:100,fontSize:13,fontWeight:700,border:"1px solid",fontFamily:ff,cursor:"pointer",transition:"all .25s",background:cat===c.id?R:"#111",color:cat===c.id?"white":"rgba(245,243,238,.48)",borderColor:cat===c.id?R:"rgba(255,255,255,.08)",boxShadow:cat===c.id?"0 0 18px rgba(196,30,58,.4)":"none"}}>{c.l}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:12}}>
        {filtered.map((item,i)=>(
          <div key={item.id} className="mc cb" style={{background:"#0e0e0e",borderRadius:15,padding:18,position:"relative",overflow:"hidden",animation:"hi .55s cubic-bezier(.16,1,.3,1) "+(i*.065)+"s both"}}>
            <div style={{position:"absolute",top:0,right:0,width:50,height:50,borderTop:"1px solid rgba(196,30,58,.08)",borderRight:"1px solid rgba(196,30,58,.08)",borderTopRightRadius:15}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <span style={{fontSize:"1.7rem",lineHeight:1}}>{item.e}</span>
              <Badge type={item.b} lang={lang}/>
            </div>
            <h3 className="ffd" style={{fontSize:19,lineHeight:1.1,marginBottom:7,color:W}}>{item.n[lang]}</h3>
            <p style={{fontSize:12,color:"rgba(245,243,238,.40)",lineHeight:1.6,marginBottom:14,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{item.d[lang]}</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span className="ffd" style={{fontSize:19,color:R}}>{item.p} €</span>
              <a href="https://wa.me/4917642573274" style={{fontSize:11,padding:"5px 12px",border:"1px solid rgba(196,30,58,.28)",borderRadius:100,color:R,fontWeight:700,textDecoration:"none",fontFamily:ff,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background=R;e.currentTarget.style.color="white"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=R}}>{T.menu.ob}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ━━━ FEATURED BURGER ━━━ */}
  <div style={{position:"relative",padding:"80px 24px",background:"linear-gradient(135deg,#040404,#060206,#080104)",overflow:"hidden"}}>
    <div style={{position:"absolute",right:0,top:0,bottom:0,width:"55%",background:"radial-gradient(ellipse 80% 80% at 85% 50%,rgba(196,30,58,.13) 0%,transparent 70%)",pointerEvents:"none"}}/>
    <div className="bgh" style={{position:"absolute",inset:0,opacity:.18}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto"}}>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
        <div className="fup">
          <span className="sg" style={{fontSize:11,fontWeight:700,letterSpacing:"0.36em",textTransform:"uppercase"}}>{T.feat.eye}</span>
          <div style={{marginTop:12,marginBottom:18}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",background:"rgba(196,30,58,.12)",border:"1px solid rgba(196,30,58,.28)",borderRadius:100,fontSize:11,fontWeight:700,letterSpacing:"0.24em",textTransform:"uppercase",color:R,marginBottom:12}}>
              <Zap size={11} fill={R}/>{T.feat.crown}
            </div>
            <div className="ffd" style={{lineHeight:.88}}>
              <span style={{display:"block",color:W,fontSize:"clamp(3rem,8vw,6.5rem)"}}>{T.feat.n1}</span>
              <span className="tgr" style={{display:"block",color:R,fontSize:"clamp(2.4rem,6.5vw,5.2rem)"}}>{T.feat.n2}</span>
            </div>
          </div>
          <p style={{fontSize:14,color:"rgba(245,243,238,.5)",lineHeight:1.7,marginBottom:20,maxWidth:420}}>{T.feat.desc}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
            {T.feat.chips.map((f,i)=>(
              <span key={i} style={{padding:"5px 13px",fontSize:11,border:"1px solid rgba(196,30,58,.18)",borderRadius:100,color:"rgba(245,243,238,.55)",fontWeight:500}}>✦ {f}</span>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <span className="ffd sg" style={{fontSize:"clamp(2rem,4vw,3rem)"}}>{T.feat.price}</span>
            <a href="https://wa.me/4917642573274" className="gr bl" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 26px",background:R,color:"white",borderRadius:100,fontSize:14,fontWeight:700,textDecoration:"none",fontFamily:ff}} onMouseEnter={e=>e.currentTarget.style.background="#A01630"} onMouseLeave={e=>e.currentTarget.style.background=R}>
              <MessageCircle size={16}/>{T.feat.cta}
            </a>
          </div>
        </div>
        <div className="fup d2" style={{display:"flex",justifyContent:"center"}}>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.22) 0%,transparent 68%)",filter:"blur(46px)",transform:"scale(1.65)",pointerEvents:"none"}}/>
            <div className="pglw mob-burger" style={{position:"relative",width:240,height:240,borderRadius:"50%",border:"1px solid rgba(196,30,58,.18)",background:"radial-gradient(circle,#180406 0%,#060202 60%)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div className="fburg mob-burger-fz" style={{fontSize:"clamp(5.5rem,10vw,7.5rem)",lineHeight:1,userSelect:"none"}}>🍔</div>
            </div>
            <div className="gr mob-badge" style={{position:"absolute",top:-14,right:-14,width:66,height:66,borderRadius:"50%",background:R,border:"4px solid #040404",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",animation:"fb 2.8s ease-in-out infinite reverse"}}>
              <Star size={11} fill={G} style={{color:G}}/>
              <span className="ffd" style={{fontSize:9,color:"white",textAlign:"center",lineHeight:1.1,marginTop:2}}>ARYA SIG.</span>
            </div>
            <div className="gg" style={{position:"absolute",bottom:-12,left:"50%",transform:"translateX(-50%)",padding:"5px 18px",background:G,borderRadius:100,whiteSpace:"nowrap"}}>
              <span className="ffd" style={{fontSize:16,color:"#040404"}}>{T.feat.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* ━━━ UNIVERSE ━━━ */}
  <div style={{position:"relative",padding:"80px 24px",background:"#060606",overflow:"hidden"}}>
    <div className="bgd" style={{position:"absolute",inset:0,opacity:.38}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto"}}>
      <div className="fup" style={{textAlign:"center",marginBottom:50}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.38em",textTransform:"uppercase",color:"rgba(196,30,58,.65)",display:"block",marginBottom:12}}>{T.univ.eye}</span>
        <div className="ffd" style={{lineHeight:.88}}>
          <span style={{display:"block",color:"rgba(245,243,238,.78)",fontSize:"clamp(2.5rem,6.5vw,5.5rem)"}}>{T.univ.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(3rem,8vw,6.5rem)"}}>{T.univ.h2}</span>
        </div>
      </div>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
        {T.univ.cards.map((c,i)=>(
          <div key={i} className={"fup cb uc d"+(i+1)} style={{padding:30,borderRadius:18,background:i===0?"#0e0506":"#0c0c0c",cursor:"default",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,right:0,width:60,height:60,borderTop:"1px solid rgba(196,30,58,.08)",borderRight:"1px solid rgba(196,30,58,.08)",borderTopRightRadius:18}}/>
            <div style={{fontSize:"2.2rem",marginBottom:16,lineHeight:1}}>{c.ic}</div>
            <h3 className="ffd" style={{fontSize:22,color:W,marginBottom:10}}>{c.t}</h3>
            <p style={{fontSize:13.5,color:"rgba(245,243,238,.45)",lineHeight:1.7}}>{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ━━━ GALLERY ━━━ */}
  <div id="gallery" style={{position:"relative",padding:"80px 24px",background:"#080808",overflow:"hidden"}}>
    <div className="bgh" style={{position:"absolute",inset:0,opacity:.25}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto"}}>
      <div className="fup" style={{textAlign:"center",marginBottom:50}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.38em",textTransform:"uppercase",color:"rgba(196,30,58,.65)",display:"block",marginBottom:12}}>{T.gal.eye}</span>
        <div className="ffd" style={{lineHeight:.88}}>
          <span style={{display:"block",color:W,fontSize:"clamp(3rem,8vw,6.5rem)"}}>{T.gal.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(3rem,8vw,6.5rem)"}}>{T.gal.h2}</span>
        </div>
      </div>
      <div className="mob-2col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {T.gal.cells.map((c,i)=>(
          <div key={i} className={"fup d"+(Math.min(i+1,4))} style={{aspectRatio:"1/1",border:"1px solid rgba(255,255,255,.05)",borderRadius:18,overflow:"hidden",position:"relative",cursor:"pointer",background:["linear-gradient(135deg,#1a0506,#080202)","linear-gradient(135deg,#050514,#020208)","linear-gradient(135deg,#050f05,#020802)","linear-gradient(135deg,#14080a,#0a0305)","linear-gradient(135deg,#0a0510,#060208)","linear-gradient(135deg,#100a05,#080402)"][i],transition:"all .3s ease"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.28)";e.currentTarget.style.transform="scale(1.02)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.05)";e.currentTarget.style.transform="scale(1)"}}>
            <div style={{position:"absolute",inset:8,border:"1px solid rgba(255,255,255,.04)",borderRadius:12}}/>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:16}}>
              <div style={{fontSize:"2.5rem",opacity:.22,marginBottom:10,lineHeight:1}}>{c.e}</div>
              <div className="ffd" style={{fontSize:15,color:"rgba(245,243,238,.25)"}}>{c.l}</div>
              <div style={{fontSize:10,color:"rgba(245,243,238,.14)",marginTop:5,letterSpacing:"0.2em",textTransform:"uppercase"}}>{c.s}</div>
            </div>
            <div style={{position:"absolute",top:10,right:10,width:7,height:7,borderRadius:"50%",background:R,opacity:.3}}/>
          </div>
        ))}
      </div>
      <div className="fup" style={{textAlign:"center",marginTop:32}}>
        <a href="https://instagram.com/arya_hausderhelden" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 24px",border:"1px solid rgba(255,255,255,.1)",borderRadius:100,color:"rgba(245,243,238,.5)",fontSize:13,fontWeight:700,textDecoration:"none",fontFamily:ff,transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.22)";e.currentTarget.style.color="rgba(245,243,238,.8)";e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(245,243,238,.5)";e.currentTarget.style.transform="translateY(0)"}}>
          <Instagram size={16}/>{lang==="de"?"Mehr auf Instagram":"بیشتر در اینستاگرام"}
        </a>
      </div>
    </div>
  </div>

  {/* ━━━ CONTACT ━━━ */}
  <div id="contact" style={{position:"relative",padding:"80px 24px",background:"#040404",overflow:"hidden"}}>
    <div className="bgd" style={{position:"absolute",inset:0,opacity:.3}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto"}}>
      <div className="fup" style={{textAlign:"center",marginBottom:50}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.38em",textTransform:"uppercase",color:"rgba(196,30,58,.65)",display:"block",marginBottom:12}}>{T.contact.eye}</span>
        <div className="ffd" style={{lineHeight:.88}}>
          <span style={{display:"block",color:"rgba(245,243,238,.78)",fontSize:"clamp(2.5rem,7vw,5.5rem)"}}>{T.contact.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(3rem,8vw,6.5rem)"}}>{T.contact.h2}</span>
        </div>
      </div>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div className="fup cb" style={{background:"#0c0c0c",borderRadius:18,padding:28}}>
          {[
            {ic:<MapPin size={18} style={{color:R}}/>,lbl:T.contact.lbl.addr,val:<>Kölner Str. 220<br/>40227 Düsseldorf</>,href:null},
            {ic:<Phone size={18} style={{color:R}}/>,lbl:T.contact.lbl.ph,val:"+49 176 4257 3274",href:"tel:+4917642573274"},
            {ic:<Instagram size={18} style={{color:R}}/>,lbl:T.contact.lbl.ig,val:"@arya_hausderhelden",href:"https://instagram.com/arya_hausderhelden"},
          ].map((row,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
              <div style={{width:38,height:38,borderRadius:10,background:"rgba(196,30,58,.10)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{row.ic}</div>
              <div>
                <div style={{fontSize:9,color:"rgba(245,243,238,.4)",textTransform:"uppercase",letterSpacing:"0.24em",fontWeight:700,marginBottom:4}}>{row.lbl}</div>
                {row.href
                  ?<a href={row.href} style={{fontWeight:600,color:W,textDecoration:"none",fontFamily:ff,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=R} onMouseLeave={e=>e.currentTarget.style.color=W}>{row.val}</a>
                  :<div style={{fontWeight:600}}>{row.val}</div>}
              </div>
            </div>
          ))}
          <div style={{paddingTop:18}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <Clock size={13} style={{color:R}}/><span style={{fontSize:9,color:"rgba(245,243,238,.4)",textTransform:"uppercase",letterSpacing:"0.24em",fontWeight:700}}>{T.contact.lbl.hrs}</span>
            </div>
            {T.contact.hours.map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.05)",fontSize:13}}>
                <span style={{color:"rgba(245,243,238,.6)"}}>{r.d}</span>
                <span style={{fontWeight:600}}>{r.h}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="fup d1">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            {[
              {l:lang==="de"?"WhatsApp schreiben":"واتساپ",href:"https://wa.me/4917642573274",bg:"#25D366",ic:<MessageCircle size={20}/>},
              {l:lang==="de"?"Anrufen":"تماس",href:"tel:+4917642573274",bg:R,ic:<Phone size={20}/>},
              {l:lang==="de"?"Route starten":"مسیریابی",href:"https://maps.app.goo.gl/S6LkGJ9oc5PYYGco6?g_st=ic",bg:"#1c1c1c",ic:<MapPin size={20}/>},
              {l:lang==="de"?"Instagram folgen":"اینستاگرام",href:"https://instagram.com/arya_hausderhelden",bg:"linear-gradient(135deg,#7c3aed,#db2777)",ic:<Instagram size={20}/>},
            ].map((btn,i)=>(
              <a key={i} href={btn.href} className="bl" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:18,borderRadius:14,background:btn.bg,color:"white",fontWeight:700,fontSize:13,textDecoration:"none",fontFamily:ff,border:"1px solid rgba(255,255,255,.06)"}}>
                {btn.ic}{btn.l}
              </a>
            ))}
          </div>
          <a href="https://maps.app.goo.gl/S6LkGJ9oc5PYYGco6?g_st=ic" className="uc" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,height:130,borderRadius:14,border:"1px solid rgba(255,255,255,.05)",background:"linear-gradient(135deg,#0f1a0f,#050a05)",textDecoration:"none",position:"relative",overflow:"hidden",cursor:"pointer"}}>
            <div className="bgd" style={{position:"absolute",inset:0,opacity:.6}}/>
            <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <div className="gr" style={{width:38,height:38,borderRadius:"50%",background:R,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <MapPin size={16} fill="white" style={{color:"white"}}/>
              </div>
              <span className="ffd" style={{fontSize:13,color:"rgba(245,243,238,.55)"}}>Kölner Str. 220 · 40227 Düsseldorf</span>
              <span style={{fontSize:10,color:"rgba(196,30,58,.6)",letterSpacing:"0.2em",textTransform:"uppercase"}}>{T.contact.mapCta}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* ━━━ FOOTER ━━━ */}
  <footer style={{padding:"36px 24px",background:"#030303",borderTop:"1px solid rgba(255,255,255,.05)"}}>
    <div style={{maxWidth:1160,margin:"0 auto",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:16}}>
      <AryaLogo sz={56}/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:11,color:"rgba(245,243,238,.2)"}}>{T.footer.r}</div>
        <div style={{fontSize:11,color:"rgba(196,30,58,.5)",marginTop:3}}>{T.footer.m}</div>
      </div>
      <div style={{display:"flex",gap:9}}>
        {[{h:"https://instagram.com/arya_hausderhelden",ic:<Instagram size={15}/>},{h:"https://wa.me/4917642573274",ic:<MessageCircle size={15}/>},{h:"tel:+4917642573274",ic:<Phone size={15}/>}].map((s,i)=>(
          <a key={i} href={s.h} style={{width:34,height:34,borderRadius:"50%",border:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:W,textDecoration:"none",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.45)";e.currentTarget.style.color=R;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color=W;e.currentTarget.style.transform="translateY(0)"}}>{s.ic}</a>
        ))}
      </div>
    </div>
  </footer>

  {/* ━━━ MOBILE ACTION BAR ━━━ */}
  <div style={{display:"flex",borderTop:"1px solid rgba(255,255,255,.08)",background:"rgba(10,10,10,.98)",backdropFilter:"blur(20px)"}}>
    <a href="https://wa.me/4917642573274" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:"12px 0",background:R,color:"white",textDecoration:"none",fontFamily:ff}}>
      <MessageCircle size={20}/><span style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em"}}>{T.mob.wa}</span>
    </a>
    <a href="tel:+4917642573274" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:"12px 0",background:"#111",color:W,textDecoration:"none",borderLeft:"1px solid rgba(255,255,255,.08)",borderRight:"1px solid rgba(255,255,255,.08)",fontFamily:ff}}>
      <Phone size={20}/><span style={{fontSize:10,fontWeight:600,letterSpacing:"0.08em"}}>{T.mob.call}</span>
    </a>
    <a href="https://maps.app.goo.gl/S6LkGJ9oc5PYYGco6?g_st=ic" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:"12px 0",background:"#111",color:W,textDecoration:"none",fontFamily:ff}}>
      <MapPin size={20}/><span style={{fontSize:10,fontWeight:600,letterSpacing:"0.08em"}}>{T.mob.route}</span>
    </a>
  </div>

  </div>
  );
}
