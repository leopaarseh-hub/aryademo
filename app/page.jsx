"use client";
import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Instagram, MessageCircle, ArrowRight, Clock, Star, ChevronDown, Zap, Menu, X } from "lucide-react";

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

/* ── KEYFRAMES ── */
@keyframes shimmer{0%{background-position:-220% center}100%{background-position:220% center}}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes fb{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-10px) rotate(1deg)}}
@keyframes pg{0%,100%{box-shadow:0 0 22px rgba(196,30,58,.45)}50%{box-shadow:0 0 55px rgba(196,30,58,.85)}}
@keyframes pt{0%{transform:translateY(0);opacity:.65}50%{transform:translateY(-40px);opacity:.3}100%{transform:translateY(-82px);opacity:0}}
@keyframes hi{from{opacity:0;transform:translateY(44px)}to{opacity:1;transform:translateY(0)}}
@keyframes dnaFlow{0%{transform:translateY(0)}100%{transform:translateY(-400px)}}
@keyframes lightning{0%,93%,100%{opacity:0}94%{opacity:.9;filter:brightness(2)}95%{opacity:0}96%{opacity:.7}97%{opacity:0}}
@keyframes pulseRing{0%{transform:scale(.6);opacity:1}100%{transform:scale(2.8);opacity:0}}
@keyframes burstSpin{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(8deg) scale(1.08)}}
@keyframes speedLine{0%{transform:translateX(-120%);opacity:0}25%,75%{opacity:.6}100%{transform:translateX(120vw);opacity:0}}
@keyframes floatSlow{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-20px) rotate(180deg)}}
@keyframes spinSlow{to{transform:rotate(360deg)}}
@keyframes spinRev{to{transform:rotate(-360deg)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(196,30,58,.4)}50%{box-shadow:0 0 55px rgba(196,30,58,.9),0 0 100px rgba(196,30,58,.3)}}
@keyframes bounceSubtle{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes comicShake{0%,100%{transform:rotate(0)}25%{transform:rotate(-1.5deg)}75%{transform:rotate(1.5deg)}}
@keyframes textPulse{0%,100%{filter:drop-shadow(0 0 12px rgba(196,30,58,.5))}50%{filter:drop-shadow(0 0 30px rgba(196,30,58,.95))}}
@keyframes flashCorner{0%,90%,100%{opacity:0}92%,94%{opacity:1}93%{opacity:.5}}
@keyframes radarPulse{0%{transform:scale(0);opacity:1}100%{transform:scale(2.5);opacity:0}}
@keyframes dashFlow{to{stroke-dashoffset:-200}}
@keyframes bgPan{0%{background-position:0% 0%}100%{background-position:100% 100%}}
@keyframes flyAcross{0%{transform:translateX(-100px) translateY(0) rotate(0)}100%{transform:translateX(calc(100vw + 100px)) translateY(-60px) rotate(720deg)}}

/* ── UTILITY CLASSES ── */
.ht1{animation:hi 1.1s cubic-bezier(.16,1,.3,1) .4s both}
.ht2{animation:hi 1.1s cubic-bezier(.16,1,.3,1) .58s both}
.hc{animation:hi .85s cubic-bezier(.16,1,.3,1) .76s both}
.hb{animation:hi .85s cubic-bezier(.16,1,.3,1) .94s both}
.heye{animation:hi .9s cubic-bezier(.16,1,.3,1) .22s both}
.fup{opacity:0;transform:translateY(28px);transition:opacity .78s cubic-bezier(.16,1,.3,1),transform .78s cubic-bezier(.16,1,.3,1)}
.fup.vis{opacity:1;transform:none}
.d1{transition-delay:.12s}.d2{transition-delay:.24s}.d3{transition-delay:.36s}.d4{transition-delay:.48s}
.sg{background:linear-gradient(90deg,#D4AF37,#fffbe8 48%,#D4AF37);background-size:220% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 3.5s linear infinite}
.tgr{text-shadow:0 0 30px rgba(196,30,58,.75),0 0 64px rgba(196,30,58,.4),0 0 120px rgba(196,30,58,.2);animation:textPulse 3s ease-in-out infinite}
.gr{box-shadow:0 0 32px rgba(196,30,58,.5),0 0 64px rgba(196,30,58,.25)}
.gg{box-shadow:0 0 22px rgba(212,175,55,.4)}
.mtrk{animation:mq 22s linear infinite;display:flex;white-space:nowrap}
.fburg{animation:fb 3.8s ease-in-out infinite}
.pglw{animation:pg 2.6s ease-in-out infinite}
.glowp{animation:glowPulse 3s ease-in-out infinite}
.ptcl{animation:pt linear infinite;position:absolute;border-radius:50%;background:#C41E3A;pointer-events:none}
.dna-strand{animation:dnaFlow 18s linear infinite;will-change:transform}
.lightning-1{animation:lightning 8s ease-in-out infinite}
.lightning-2{animation:lightning 11s ease-in-out 2s infinite}
.lightning-3{animation:lightning 13s ease-in-out 5s infinite}
.spin-slow{animation:spinSlow 22s linear infinite}
.spin-rev{animation:spinRev 28s linear infinite}
.spin-med{animation:spinSlow 14s linear infinite}
.burst-spin{animation:burstSpin 3.5s ease-in-out infinite}
.float-slow{animation:floatSlow 6s ease-in-out infinite}
.bounce-sub{animation:bounceSubtle 2.4s ease-in-out infinite}
.comic-shake{animation:comicShake 4s ease-in-out infinite}
.flash-corner{animation:flashCorner 4s ease-in-out infinite}
.pulse-ring{position:absolute;inset:0;border:2px solid #C41E3A;border-radius:50%;animation:pulseRing 2.4s cubic-bezier(.4,0,.6,1) infinite}
.pulse-ring-2{animation-delay:.8s}
.pulse-ring-3{animation-delay:1.6s}
.fly-across{animation:flyAcross 18s linear infinite}
.mc{transition:all .35s cubic-bezier(.16,1,.3,1);transform-style:preserve-3d}
.mc:hover{transform:translateY(-8px) rotateX(2deg)!important;box-shadow:0 0 42px rgba(196,30,58,.32),0 30px 60px rgba(0,0,0,.7)!important;border-color:rgba(196,30,58,.55)!important}
.uc{transition:all .4s ease}.uc:hover{border-color:rgba(196,30,58,.5)!important;background:#100507!important;transform:translateY(-4px)}
.bl{transition:all .25s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden}.bl:hover{transform:translateY(-3px) scale(1.02)!important}
.bl::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent,rgba(255,255,255,.18),transparent);transform:translateX(-100%);transition:transform .6s}
.bl:hover::before{transform:translateX(100%)}
.bgh{background-image:radial-gradient(circle,rgba(196,30,58,.09) 1px,transparent 1px);background-size:22px 22px}
.bgd{background-image:radial-gradient(circle,rgba(255,255,255,.035) 1px,transparent 1px);background-size:28px 28px}
.bgh-anim{background-image:radial-gradient(circle,rgba(196,30,58,.12) 1px,transparent 1px);background-size:22px 22px;animation:bgPan 30s linear infinite}
.cb{border:1px solid rgba(196,30,58,.18);outline:1px solid rgba(212,175,55,.055);outline-offset:4px}
.comic-frame{position:relative;overflow:hidden}
.comic-frame::before,.comic-frame::after{content:'';position:absolute;width:24px;height:24px;border-color:#C41E3A;border-style:solid;border-width:0}
.comic-frame::before{top:8px;left:8px;border-top-width:2px;border-left-width:2px}
.comic-frame::after{bottom:8px;right:8px;border-bottom-width:2px;border-right-width:2px}
.tilt-card{perspective:1000px}
.tilt-card-inner{transition:transform .4s cubic-bezier(.16,1,.3,1);transform-style:preserve-3d}
.speed-line{position:absolute;height:2px;background:linear-gradient(90deg,transparent,rgba(196,30,58,.6),transparent);animation:speedLine 4s ease-in-out infinite;pointer-events:none}
.pow-text{position:absolute;font-family:'Bebas Neue',cursive;color:#D4AF37;text-shadow:3px 3px 0 #C41E3A,5px 5px 0 #000;animation:comicShake 3s ease-in-out infinite;pointer-events:none}
.radar-pulse{position:absolute;border:2px solid #C41E3A;border-radius:50%;animation:radarPulse 3s cubic-bezier(.4,0,.6,1) infinite;pointer-events:none}
#story,#menu,#gallery,#contact{scroll-margin-top:88px}
html{scroll-behavior:smooth}
.mob-only{display:none}
@media(max-width:767px){.mob-only{display:flex!important}.mob-hide{display:none!important}.mob-1col{grid-template-columns:1fr!important}.mob-2col{grid-template-columns:1fr 1fr!important}.mob-pad{padding:52px 16px!important}.mob-burger{width:180px!important;height:180px!important}.mob-burger-fz{font-size:5rem!important}.mob-badge{top:-10px!important;right:-10px!important;width:52px!important;height:52px!important}.pow-text{font-size:1.5rem!important}}
`;

const TR={
  de:{
    nav:{links:["Speisekarte","Geschichte","Galerie","Kontakt"],ids:["menu","story","gallery","contact"],cta:"Jetzt Bestellen"},
    hero:{eye:"Düsseldorfs legendärste Adresse",l1:"HAUS DER",l2:"HELDEN",sub:"Iranisch · Afghanisch · Superhelden-Niveau",badge:"Kölner Str. 220 · 40227 Düsseldorf",c1:"Speisekarte",c2:"WhatsApp Bestellen",c3:"Route starten",scroll:"Entdecke das Universum",pow:"POW!",bam:"BAM!",zap:"ZAP!"},
    story:{eye:"— Kapitel 01 · Ursprung —",h1:"Wo echte",h2:"HELDEN",h3:"essen gehen",p1:"ARYA – HAUS DER HELDEN ist kein Restaurant. Es ist ein Universum, das du betrittst.",p2:"Im Herzen Düsseldorfs treffen die Aromen Irans und Afghanistans auf die Energie der Superhelden. Jedes Gericht ist eine Legende.",stats:[{n:"30+",l:"Helden-Gerichte"},{n:"2",l:"Kulturen · 1 Küche"},{n:"100%",l:"Original"},{n:"★★★★★",l:"Erlebnis"}]},
    marquee:["HERO BURGER","AFGHAN SPECIALS","IRANIAN CLASSICS","SUPERHERO VIBES","DÜSSELDORF","HAUS DER HELDEN","ARYA","PREMIUM FAST FOOD"],
    menu:{eye:"— Kapitel 02 · Speisekarte —",h1:"DIE HELDEN-",h2:"KARTE",cats:[{id:"burgers",l:"🦸  Hero Burger"},{id:"afghan",l:"🏔  Afghan Specials"},{id:"iranian",l:"🌿  Iranian Classics"},{id:"sides",l:"🍟  Beilagen"},{id:"drinks",l:"🥤  Getränke"}],ob:"Bestellen"},
    feat:{eye:"★  Die Signatur  ★",crown:"LEGENDARY",n1:"IRON FLAME",n2:"BURGER",desc:"Das Original. Double Beef-Patty auf Brioche-Bun, karamellisierte Zwiebeln, geröstete Jalapeños, Avocado-Creme und die berühmte Arya-Geheimsoße. Mit geschmolzenem Cheddar.",price:"14,90 €",cta:"Jetzt Bestellen",chips:["Double Beef Patty","Arya Geheimsoße","Karamell-Zwiebeln","Premium Brioche-Bun"]},
    univ:{eye:"— Kapitel 03 · Das Universum —",h1:"BETRITT",h2:"UNSER UNIVERSUM",cards:[{ic:"⚡",t:"Superhelden-Atmosphäre",d:"Wandmalereien, Comics und pure Energie — jede Ecke erzählt eine Geschichte, die du nie vergisst."},{ic:"🔥",t:"Premium-Zutaten",d:"Täglich frisch. Keine Kompromisse. Nur das Allerbeste für echte Helden."},{ic:"🏆",t:"Originale Rezepte",d:"Generationen alte Geheimnisse aus Iran und Afghanistan — neu interpretiert, niemals vergessen."},{ic:"📸",t:"100% Instagrammable",d:"Jeder Burger, jeder Moment, jeder Winkel — gemacht für dein Feed und deine Erinnerungen."}]},
    gal:{eye:"— Kapitel 04 · Galerie —",h1:"VISUELLE",h2:"LEGENDEN",cells:[{e:"🔥",l:"Signature Burger",s:"Foto folgt bald"},{e:"⚡",l:"Restaurant Interior",s:"Foto folgt bald"},{e:"🏔",l:"Afghan Special",s:"Foto folgt bald"},{e:"🦸",l:"Hero Atmosphäre",s:"Foto folgt bald"},{e:"🌿",l:"Iranian Classic",s:"Foto folgt bald"},{e:"★",l:"Helden-Erlebnis",s:"Foto folgt bald"}]},
    contact:{eye:"— Kapitel 05 · Finde uns —",h1:"KOMM ZU",h2:"DEN HELDEN",lbl:{addr:"Adresse",ph:"Telefon",ig:"Instagram",hrs:"Öffnungszeiten"},hours:[{d:"Mo – Fr",h:"11:00 – 22:00 Uhr"},{d:"Sa – So",h:"11:00 – 23:00 Uhr"}],mapCta:"Route in Google Maps öffnen"},
    footer:{tl:"Düsseldorfs Superhelden-Restaurant",r:"© 2026 ARYA – HAUS DER HELDEN. Alle Rechte vorbehalten.",m:"Für echte Helden gemacht ⚡"},
    mob:{wa:"Bestellen",call:"Anrufen",route:"Route"},
    badge:{popular:"★ Beliebt",hot:"🔥 Scharf",new:"NEU",special:"★ Special",vegan:"🌿 Vegan"},
  },
  fa:{
    nav:{links:["منو","داستان","گالری","تماس"],ids:["menu","story","gallery","contact"],cta:"سفارش دهید"},
    hero:{eye:"افسانه‌ای‌ترین رستوران دوسلدورف",l1:"خانه",l2:"قهرمانان",sub:"ایرانی · افغانی · در سطح ابرقهرمانان",badge:"کلنر اشتراسه ۲۲۰ · دوسلدورف",c1:"مشاهده منو",c2:"سفارش واتساپ",c3:"مسیریابی",scroll:"جهان را کشف کن",pow:"POW!",bam:"BAM!",zap:"ZAP!"},
    story:{eye:"— فصل ۰۱ · خاستگاه —",h1:"جایی که قهرمانان",h2:"واقعی",h3:"غذا می‌خورند",p1:"آریا – خانه قهرمانان یک رستوران نیست. جهانی است که وارد آن می‌شوی.",p2:"در قلب دوسلدورف، عطر ایران و افغانستان با انرژی ابرقهرمانان در هم می‌آمیزد. هر غذا یک افسانه است.",stats:[{n:"+۳۰",l:"غذای قهرمانی"},{n:"۲",l:"فرهنگ · ۱ آشپزخانه"},{n:"۱۰۰٪",l:"اصیل"},{n:"★★★★★",l:"تجربه"}]},
    marquee:["برگر قهرمان","ویژه افغانی","کلاسیک ایرانی","SUPERHERO VIBES","دوسلدورف","خانه قهرمانان","آریا","غذای ممتاز"],
    menu:{eye:"— فصل ۰۲ · منو —",h1:"کارت",h2:"قهرمانان",cats:[{id:"burgers",l:"🦸  برگر قهرمان"},{id:"afghan",l:"🏔  ویژه افغانی"},{id:"iranian",l:"🌿  کلاسیک ایرانی"},{id:"sides",l:"🍟  پیش‌غذا"},{id:"drinks",l:"🥤  نوشیدنی"}],ob:"سفارش"},
    feat:{eye:"★  امضای ما  ★",crown:"افسانه‌ای",n1:"آیرون فلیم",n2:"برگر",desc:"اصل اصیل. دو لایه گوشت گاو روی نان بریوش، پیاز کاراملی، جالاپنیو برشته و سس مخفی آریا. با چدار ذوب شده سرو می‌شود.",price:"۱۴٫۹۰ یورو",cta:"همین الان سفارش بده",chips:["دو لایه گوشت گاو","سس مخفی آریا","پیاز کاراملی","بریوش ویژه"]},
    univ:{eye:"— فصل ۰۳ · جهان ما —",h1:"وارد",h2:"جهان ما شو",cards:[{ic:"⚡",t:"فضای ابرقهرمانی",d:"نقاشی‌های دیواری، کمیک‌ها و انرژی خالص — هر گوشه داستانی دارد که هرگز فراموش نمی‌کنی."},{ic:"🔥",t:"مواد اولیه برتر",d:"هر روز تازه تحویل. بدون سازش. فقط بهترین برای قهرمانان واقعی."},{ic:"🏆",t:"دستورالعمل اصیل",d:"اسرار نسل‌های قدیم از ایران و افغانستان — با تفسیری نو، هرگز فراموش نشده."},{ic:"📸",t:"۱۰۰٪ قابل اشتراک",d:"هر برگر، هر لحظه — ساخته شده برای فید و خاطرات شما."}]},
    gal:{eye:"— فصل ۰۴ · گالری —",h1:"افسانه‌های",h2:"تصویری",cells:[{e:"🔥",l:"برگر امضایی",s:"عکس به زودی"},{e:"⚡",l:"داخل رستوران",s:"عکس به زودی"},{e:"🏔",l:"ویژه افغانی",s:"عکس به زودی"},{e:"🦸",l:"فضای قهرمانی",s:"عکس به زودی"},{e:"🌿",l:"کلاسیک ایرانی",s:"عکس به زودی"},{e:"★",l:"تجربه قهرمانی",s:"عکس به زودی"}]},
    contact:{eye:"— فصل ۰۵ · پیدایمان کن —",h1:"نزد",h2:"قهرمانان بیا",lbl:{addr:"آدرس",ph:"تلفن",ig:"اینستاگرام",hrs:"ساعات کاری"},hours:[{d:"دوشنبه – جمعه",h:"۱۱:۰۰ – ۲۲:۰۰"},{d:"شنبه – یکشنبه",h:"۱۱:۰۰ – ۲۳:۰۰"}],mapCta:"در گوگل مپس باز کن"},
    footer:{tl:"رستوران ابرقهرمانان دوسلدورف",r:"© ۲۰۲۶ آریا – خانه قهرمانان. تمام حقوق محفوظ است.",m:"ساخته شده برای قهرمانان واقعی ⚡"},
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

// ── DNA HELIX BACKGROUND ──────────────────────────────────────────────
function DNAStrand({x,delay=0,opacity=.18}){
  const points=Array.from({length:24},(_,i)=>i*40);
  return(
    <svg width="80" height="800" viewBox="0 0 80 800" style={{position:"absolute",left:x,top:0,height:"800px",animation:`dnaFlow 18s linear ${delay}s infinite`,opacity}}>
      <path d="M 20,0 C 60,50 60,50 20,100 C 60,150 60,150 20,200 C 60,250 60,250 20,300 C 60,350 60,350 20,400 C 60,450 60,450 20,500 C 60,550 60,550 20,600 C 60,650 60,650 20,700 C 60,750 60,750 20,800" stroke="#C41E3A" strokeWidth="1.2" fill="none"/>
      <path d="M 60,0 C 20,50 20,50 60,100 C 20,150 20,150 60,200 C 20,250 20,250 60,300 C 20,350 20,350 60,400 C 20,450 20,450 60,500 C 20,550 20,550 60,600 C 20,650 20,650 60,700 C 20,750 20,750 60,800" stroke="#C41E3A" strokeWidth="1.2" fill="none"/>
      {points.map(y=>(<g key={y}><line x1="20" y1={y} x2="60" y2={y} stroke="#C41E3A" strokeWidth=".5" opacity=".5"/><circle cx="20" cy={y} r="1.6" fill="#C41E3A"/><circle cx="60" cy={y} r="1.6" fill="#C41E3A"/></g>))}
    </svg>
  );
}
function DNABackground(){
  return(
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}} aria-hidden>
      <div style={{position:"absolute",left:"-30px",top:0,bottom:0,width:80}}><DNAStrand x={0} delay={0} opacity={.18}/></div>
      <div style={{position:"absolute",right:"-30px",top:0,bottom:0,width:80}}><DNAStrand x={0} delay={3} opacity={.14}/></div>
      <div style={{position:"absolute",left:"22%",top:0,bottom:0,width:80,opacity:.08}}><DNAStrand x={0} delay={7}/></div>
      <div style={{position:"absolute",right:"24%",top:0,bottom:0,width:80,opacity:.06}}><DNAStrand x={0} delay={11}/></div>
    </div>
  );
}

// ── COMIC BURST STAR ──────────────────────────────────────────────────
function ComicBurst({sz=80,color="#C41E3A",fill="#D4AF37",label="",className="",style={}}){
  const pts=[];const N=16;
  for(let i=0;i<N*2;i++){
    const ang=(i/(N*2))*Math.PI*2-Math.PI/2;
    const r=i%2===0?sz/2:sz/2*0.55;
    pts.push((sz/2+Math.cos(ang)*r).toFixed(1)+","+(sz/2+Math.sin(ang)*r).toFixed(1));
  }
  return(
    <div className={className} style={{width:sz,height:sz,position:"relative",...style}}>
      <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} className="burst-spin" style={{filter:`drop-shadow(0 0 18px ${color}99)`}}>
        <polygon points={pts.join(" ")} fill={fill} stroke={color} strokeWidth="2"/>
      </svg>
      {label&&<div className="ffd" style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#1a0000",fontSize:sz*0.22,letterSpacing:".03em",textShadow:"1px 1px 0 rgba(255,255,255,.3)",lineHeight:1,textAlign:"center",pointerEvents:"none"}}>{label}</div>}
    </div>
  );
}

// ── LIGHTNING BOLT SVG ────────────────────────────────────────────────
function LightningBolt({className="",size=200,color="#fff",style={}}){
  return(
    <svg width={size} height={size*1.6} viewBox="0 0 50 80" className={className} style={{filter:`drop-shadow(0 0 12px ${color}) drop-shadow(0 0 28px #C41E3A)`,...style}} aria-hidden>
      <polygon points="28,2 6,42 22,42 14,78 44,32 28,32 36,2" fill={color}/>
    </svg>
  );
}

// ── FLOATING COMIC ICONS ──────────────────────────────────────────────
function SVGStar({s=14,c="#C41E3A"}){return <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1" strokeLinejoin="round"><polygon points="12,2 14.9,8.6 22,9.3 16.5,14.2 18.2,21 12,17.4 5.8,21 7.5,14.2 2,9.3 9.1,8.6"/></svg>;}
function SVGBolt({s=14,c="#C41E3A"}){return <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="13,2 4,14 11,14 9,22 20,10 13,10 15,2"/></svg>;}
function SVGShield({s=14,c="#C41E3A"}){return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round"><path d="M12 2 L4 5 V12 C4 17.5 7.5 20.5 12 22 C16.5 20.5 20 17.5 20 12 V5 Z" fill={c} fillOpacity="0.85"/></svg>;}
function SVGDiamond({s=14,c="#C41E3A"}){return <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="12,2 22,12 12,22 2,12"/><polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="#fff" strokeWidth=".5" strokeOpacity="0.3"/></svg>;}
function SVGBurst8({s=14,c="#C41E3A"}){const p=[];for(let i=0;i<16;i++){const a=(i/16)*Math.PI*2-Math.PI/2;const r=i%2?2.5:11;p.push((12+Math.cos(a)*r).toFixed(1)+","+(12+Math.sin(a)*r).toFixed(1))}return <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points={p.join(" ")}/></svg>;}

const FLOATING_ICONS=[
  {C:SVGBolt,l:"8%",t:"12%",sz:18,dur:5,del:0,op:.4},
  {C:SVGStar,l:"88%",t:"22%",sz:14,dur:6,del:1.2,op:.45},
  {C:SVGShield,l:"15%",t:"75%",sz:20,dur:7,del:2.5,op:.35},
  {C:SVGBurst8,l:"82%",t:"68%",sz:18,dur:5.5,del:.8,op:.38},
  {C:SVGBolt,l:"45%",t:"88%",sz:14,dur:6.5,del:3.2,op:.32},
  {C:SVGDiamond,l:"32%",t:"18%",sz:12,dur:7.2,del:1.6,op:.3},
  {C:SVGStar,l:"60%",t:"82%",sz:11,dur:6.8,del:4,op:.3},
];
function FloatingDecors(){
  return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}} aria-hidden>
      {FLOATING_ICONS.map((it,i)=>{const Ic=it.C;return(
        <div key={i} className="float-slow" style={{position:"absolute",left:it.l,top:it.t,opacity:it.op,animationDuration:it.dur+"s",animationDelay:it.del+"s",filter:"drop-shadow(0 0 8px rgba(196,30,58,.45))"}}><Ic s={it.sz}/></div>
      );})}
    </div>
  );
}

function SVGBurger({size=200}){
  return(
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{filter:"drop-shadow(0 14px 32px rgba(0,0,0,.7)) drop-shadow(0 0 18px rgba(196,30,58,.35))"}}>
      <defs>
        <linearGradient id="bt" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#F0C481"/><stop offset="60%" stopColor="#D49B5C"/><stop offset="100%" stopColor="#A56D38"/></linearGradient>
        <linearGradient id="bb" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#C18B4E"/><stop offset="100%" stopColor="#8A5A2E"/></linearGradient>
        <linearGradient id="pt" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#7A3E25"/><stop offset="100%" stopColor="#3C1B0F"/></linearGradient>
        <radialGradient id="bg" cx="50%" cy="30%" r="60%"><stop offset="0%" stopColor="rgba(255,235,200,0.25)"/><stop offset="100%" stopColor="rgba(255,235,200,0)"/></radialGradient>
      </defs>
      <path d="M 22,82 Q 22,32 100,32 Q 178,32 178,82 L 178,86 L 22,86 Z" fill="url(#bt)"/>
      <path d="M 22,82 Q 22,32 100,32 Q 178,32 178,82" fill="url(#bg)"/>
      <ellipse cx="55" cy="62" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(-15 55 62)"/>
      <ellipse cx="78" cy="52" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(8 78 52)"/>
      <ellipse cx="102" cy="58" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(-4 102 58)"/>
      <ellipse cx="128" cy="50" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(18 128 50)"/>
      <ellipse cx="150" cy="68" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(-10 150 68)"/>
      <ellipse cx="68" cy="74" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(14 68 74)"/>
      <ellipse cx="92" cy="70" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(-12 92 70)"/>
      <ellipse cx="118" cy="72" rx="3" ry="1.8" fill="#FBEAC2" transform="rotate(6 118 72)"/>
      <path d="M 22,86 Q 28,98 36,90 Q 44,100 52,88 Q 60,100 68,90 Q 76,100 84,88 Q 92,100 100,90 Q 108,100 116,88 Q 124,100 132,90 Q 140,100 148,88 Q 156,100 164,90 Q 172,100 178,92 L 178,86 Z" fill="#5DA847"/>
      <path d="M 22,86 Q 28,92 36,88 Q 44,94 52,86 Q 60,94 68,88 Q 76,94 84,86 L 178,86 Z" fill="#82C168"/>
      <path d="M 26,100 L 174,100 L 174,116 Q 168,121 160,114 L 148,118 Q 132,114 116,118 L 102,114 Q 86,118 70,114 L 56,118 Q 44,114 26,116 Z" fill="#FFC436"/>
      <path d="M 26,100 L 174,100 L 174,116 Q 168,121 160,114 L 148,118 Q 132,114 116,118 L 102,114 Q 86,118 70,114 L 56,118 Q 44,114 26,116 Z" fill="none" stroke="#E5A210" strokeWidth=".5"/>
      <rect x="24" y="116" width="152" height="24" rx="3" fill="url(#pt)"/>
      <ellipse cx="46" cy="124" rx="6" ry="2.2" fill="#2A1208" opacity=".65"/>
      <ellipse cx="78" cy="128" rx="7" ry="2.2" fill="#2A1208" opacity=".65"/>
      <ellipse cx="118" cy="122" rx="7" ry="2.2" fill="#2A1208" opacity=".65"/>
      <ellipse cx="152" cy="127" rx="6" ry="2.2" fill="#2A1208" opacity=".65"/>
      <ellipse cx="60" cy="132" rx="5" ry="1.8" fill="#2A1208" opacity=".5"/>
      <ellipse cx="98" cy="134" rx="6" ry="1.8" fill="#2A1208" opacity=".5"/>
      <ellipse cx="138" cy="132" rx="5" ry="1.8" fill="#2A1208" opacity=".5"/>
      <path d="M 24,140 L 176,140 L 176,148 L 24,148 Z" fill="#D63F33"/>
      <path d="M 24,140 L 176,140 L 176,143 L 24,143 Z" fill="#E55245"/>
      <circle cx="50" cy="144" r="1.2" fill="#FFD8A0" opacity=".7"/>
      <circle cx="82" cy="144" r="1.2" fill="#FFD8A0" opacity=".7"/>
      <circle cx="114" cy="144" r="1.2" fill="#FFD8A0" opacity=".7"/>
      <circle cx="146" cy="144" r="1.2" fill="#FFD8A0" opacity=".7"/>
      <path d="M 22,148 L 178,148 L 178,162 Q 178,176 100,176 Q 22,176 22,162 Z" fill="url(#bb)"/>
      <path d="M 22,148 L 178,148 L 178,154 Q 100,159 22,154 Z" fill="rgba(255,220,170,.2)"/>
    </svg>
  );
}

const PTCLS=[
  {l:"10%",b:"15%",w:2.5,o:.7,du:"4.2s",de:"0s"},{l:"25%",b:"35%",w:1.8,o:.5,du:"3.7s",de:"0.9s"},
  {l:"42%",b:"10%",w:3,o:.6,du:"5.1s",de:"1.5s"},{l:"58%",b:"40%",w:1.5,o:.4,du:"3.9s",de:"0.3s"},
  {l:"70%",b:"22%",w:2.2,o:.65,du:"4.6s",de:"1.1s"},{l:"82%",b:"8%",w:1.7,o:.45,du:"3.4s",de:"2.1s"},
  {l:"18%",b:"52%",w:2,o:.55,du:"5.5s",de:"0.6s"},{l:"88%",b:"46%",w:1.4,o:.38,du:"4s",de:"1.7s"},
  {l:"32%",b:"68%",w:2.1,o:.5,du:"4.8s",de:"2.3s"},{l:"62%",b:"58%",w:1.6,o:.42,du:"5.2s",de:"1.4s"},
];

export default function Page(){
  const[lang,setLang]=useState("de");
  const[cat,setCat]=useState("burgers");
  const[scrolled,setScrolled]=useState(false);
  const[navOpen,setNavOpen]=useState(false);
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

  // 3D tilt for menu cards
  const handleTilt=(e)=>{
    const c=e.currentTarget;const r=c.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*8;
    const y=((e.clientY-r.top)/r.height-.5)*-8;
    const inner=c.querySelector(".tilt-inner");
    if(inner)inner.style.transform=`rotateY(${x}deg) rotateX(${y}deg) translateZ(8px)`;
  };
  const resetTilt=(e)=>{
    const inner=e.currentTarget.querySelector(".tilt-inner");
    if(inner)inner.style.transform="rotateY(0) rotateX(0) translateZ(0)";
  };

  const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setNavOpen(false);};
  const filtered=MENU.filter(m=>m.cat===cat);

  const s0={background:"none",border:"none",cursor:"pointer",fontFamily:ff,padding:0};
  const aBtn=(href,bg,extra={})=>({display:"inline-flex",alignItems:"center",gap:8,padding:"10px 22px",background:bg,color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none",fontFamily:ff,...extra});

  return(
  <div dir={rtl?"rtl":"ltr"} style={{fontFamily:ff,background:BG,color:W,overflowX:"hidden",minHeight:"100vh",position:"relative"}}>
  <style dangerouslySetInnerHTML={{__html:CSS}}/>
  <DNABackground/>

  {/* ━━━ NAV ━━━ */}
  <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:scrolled?"rgba(5,5,5,.96)":"transparent",backdropFilter:scrolled?"blur(24px)":"none",borderBottom:scrolled?"1px solid rgba(196,30,58,.15)":"none",transition:"all .4s",boxShadow:scrolled?"0 4px 40px rgba(0,0,0,.7)":"none"}}>
    <div style={{maxWidth:1160,margin:"0 auto",padding:"0 24px",height:92,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,position:"relative"}}>
      <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{...s0,flexShrink:0,lineHeight:0}}>
        <AryaLogo sz={80}/>
      </button>
      <div className="mob-hide" style={{display:"flex",gap:24,alignItems:"center"}}>
        {T.nav.links.map((l,i)=>(
          <button key={i} onClick={()=>go(T.nav.ids[i])} style={{...s0,color:"rgba(245,243,238,.55)",fontSize:13,fontWeight:600,letterSpacing:"0.04em",transition:"color .2s",position:"relative"}} onMouseEnter={e=>e.currentTarget.style.color=R} onMouseLeave={e=>e.currentTarget.style.color="rgba(245,243,238,.55)"}>{l}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:10,alignItems:"center",flexShrink:0}}>
        <button onClick={()=>setLang(l=>l==="de"?"fa":"de")} style={{padding:"5px 13px",border:"1px solid rgba(196,30,58,.28)",borderRadius:100,background:"none",cursor:"pointer",color:"rgba(245,243,238,.65)",fontSize:11,fontWeight:700,fontFamily:ff,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.65)";e.currentTarget.style.color=W}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.28)";e.currentTarget.style.color="rgba(245,243,238,.65)"}}>
          {lang==="de"?"🇩🇪 DE ⇄ FA 🇮🇷":"🇮🇷 FA ⇄ DE 🇩🇪"}
        </button>
        <a href="https://wa.me/4917642573274" className="gr bl mob-hide" style={aBtn("https://wa.me/4917642573274",R,{flexShrink:0})} onMouseEnter={e=>e.currentTarget.style.background="#A01630"} onMouseLeave={e=>e.currentTarget.style.background=R}>
          <MessageCircle size={14}/>{T.nav.cta}
        </a>
        <button className="mob-only" onClick={()=>setNavOpen(o=>!o)} aria-label="Menu" style={{width:42,height:42,borderRadius:10,border:"1px solid rgba(196,30,58,.35)",background:navOpen?"rgba(196,30,58,.15)":"rgba(20,20,20,.6)",cursor:"pointer",alignItems:"center",justifyContent:"center",color:W,transition:"all .25s",flexShrink:0}}>
          {navOpen?<X size={20}/>:<Menu size={20}/>}
        </button>
      </div>
    </div>
    {navOpen&&(
      <div className="mob-only" style={{position:"fixed",top:92,left:0,right:0,background:"rgba(5,5,5,.985)",backdropFilter:"blur(24px)",borderBottom:"1px solid rgba(196,30,58,.25)",padding:"22px 24px 26px",zIndex:49,flexDirection:"column",gap:6,boxShadow:"0 16px 40px rgba(0,0,0,.7)"}}>
        {T.nav.links.map((l,i)=>(
          <button key={i} onClick={()=>go(T.nav.ids[i])} style={{background:"none",border:"none",color:"rgba(245,243,238,.78)",fontSize:15,fontWeight:600,padding:"14px 4px",fontFamily:ff,textAlign:rtl?"right":"left",cursor:"pointer",borderBottom:i<T.nav.links.length-1?"1px solid rgba(255,255,255,.06)":"none",letterSpacing:"0.04em"}}>{l}</button>
        ))}
        <a href="https://wa.me/4917642573274" onClick={()=>setNavOpen(false)} className="gr" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",background:R,color:"white",borderRadius:100,fontSize:14,fontWeight:700,textDecoration:"none",fontFamily:ff,marginTop:12}}>
          <MessageCircle size={16}/>{T.nav.cta}
        </a>
      </div>
    )}
  </nav>

  {/* ━━━ HERO ━━━ */}
  <div id="hero" style={{position:"relative",minHeight:"94vh",display:"flex",alignItems:"center",overflow:"hidden",background:"radial-gradient(ellipse 80% 80% at 70% 40%,#160308 0%,#050505 100%)",clipPath:"polygon(0 0,100% 0,100% 93%,0 100%)"}}>
    <div className="bgh-anim" style={{position:"absolute",inset:0,opacity:.55}}/>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 55% 45% at 88% 50%,rgba(196,30,58,.13) 0%,transparent 70%),radial-gradient(ellipse 40% 55% at 12% 60%,rgba(196,30,58,.09) 0%,transparent 70%)"}}/>
    <div style={{position:"absolute",top:"-20%",bottom:"-20%",width:"1.5px",left:"62%",background:"linear-gradient(to bottom,transparent,rgba(196,30,58,.45) 40%,rgba(196,30,58,.45) 60%,transparent)",transform:"rotate(11deg)",transformOrigin:"top center",pointerEvents:"none"}}/>
    <div style={{position:"absolute",top:0,right:0,width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.2) 0%,transparent 68%)",filter:"blur(50px)",pointerEvents:"none"}}/>
    {/* Lightning bolts */}
    <LightningBolt className="lightning-1" size={140} style={{position:"absolute",top:"5%",left:"6%"}}/>
    <LightningBolt className="lightning-2" size={100} color="#D4AF37" style={{position:"absolute",top:"18%",right:"8%",transform:"scaleX(-1)"}}/>
    <LightningBolt className="lightning-3" size={80} style={{position:"absolute",bottom:"18%",left:"50%"}}/>
    {/* Speed lines */}
    <div className="speed-line" style={{top:"22%",width:"40%",animationDelay:"1.2s",animationDuration:"5s"}}/>
    <div className="speed-line" style={{top:"38%",width:"30%",animationDelay:"3s",animationDuration:"6s"}}/>
    <div className="speed-line" style={{top:"68%",width:"45%",animationDelay:"2.2s",animationDuration:"5.5s"}}/>
    {/* Comic POW! burst in corner */}
    <div className="mob-hide" style={{position:"absolute",top:"14%",right:"7%",zIndex:8,transform:"rotate(-15deg)"}}>
      <ComicBurst sz={130} color="#C41E3A" fill="#D4AF37" label={T.hero.pow}/>
    </div>
    <div className="mob-hide" style={{position:"absolute",bottom:"22%",right:"14%",zIndex:8,transform:"rotate(20deg)"}}>
      <ComicBurst sz={88} color="#C41E3A" fill="#fff" label={T.hero.zap}/>
    </div>
    {/* Particles */}
    {PTCLS.map((p,i)=>(
      <div key={i} className="ptcl" style={{left:p.l,bottom:p.b,width:p.w+"px",height:p.w+"px",opacity:p.o,animationDuration:p.du,animationDelay:p.de}}/>
    ))}
    {/* Floating comic icons */}
    <FloatingDecors/>
    <div style={{position:"relative",zIndex:10,maxWidth:1160,width:"100%",padding:"100px 24px 80px",margin:"0 auto"}}>
      <div className="heye" style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div style={{height:1,width:40,background:R,flexShrink:0}}/>
        <span style={{color:R,fontSize:11,fontWeight:700,letterSpacing:"0.34em",textTransform:"uppercase"}}>{T.hero.eye}</span>
        <div style={{height:1,width:40,background:R,flexShrink:0}}/>
      </div>
      <div className="ffd" style={{lineHeight:.86,marginBottom:14,position:"relative"}}>
        <div className="ht1" style={{display:"block",color:W,fontSize:"clamp(3.8rem,10vw,9rem)"}}>{T.hero.l1}</div>
        <div className="ht2 tgr" style={{display:"block",color:R,fontSize:"clamp(4.8rem,14vw,11.5rem)"}}>{T.hero.l2}</div>
      </div>
      <div className="hc">
        <p style={{color:"rgba(245,243,238,.55)",letterSpacing:"0.18em",marginBottom:8,fontSize:"clamp(13px,2.5vw,17px)",fontWeight:300}}>{T.hero.sub}</p>
        <div style={{display:"flex",alignItems:"center",gap:6,color:"rgba(245,243,238,.42)",fontSize:12}}>
          <MapPin size={12} style={{color:R,flexShrink:0}}/><span>{T.hero.badge}</span>
        </div>
      </div>
      <div className="hb" style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:30}}>
        <button onClick={()=>go("menu")} className="gr bl" style={{...s0,display:"inline-flex",alignItems:"center",gap:8,padding:"13px 28px",background:R,color:"white",borderRadius:100,fontSize:14,fontWeight:700,transition:"all .25s"}} onMouseEnter={e=>e.currentTarget.style.background="#A01630"} onMouseLeave={e=>e.currentTarget.style.background=R}>
          {T.hero.c1}<ArrowRight size={16}/>
        </button>
        <a href="https://wa.me/4917642573274" className="bl" style={aBtn("https://wa.me/4917642573274","rgba(18,18,18,.95)",{border:"1px solid rgba(255,255,255,.12)",transition:"all .25s",padding:"13px 28px"})} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(196,30,58,.45)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.12)"}>
          <MessageCircle size={16} style={{color:"#25D366"}}/>{T.hero.c2}
        </a>
        <a href="https://maps.app.goo.gl/S6LkGJ9oc5PYYGco6?g_st=ic" className="bl" style={aBtn(null,"transparent",{border:"1px solid rgba(255,255,255,.12)",color:"rgba(245,243,238,.6)",transition:"all .25s",padding:"13px 28px"})} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.25)";e.currentTarget.style.color="rgba(245,243,238,.9)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.12)";e.currentTarget.style.color="rgba(245,243,238,.6)"}}>
          <MapPin size={16}/>{T.hero.c3}
        </a>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,marginTop:42,opacity:.55}}>
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
          <span key={i} className="ffd" style={{fontSize:18,color:"white",padding:"0 28px",opacity:.92,flexShrink:0}}>{w}<span style={{opacity:.4,fontSize:13,marginLeft:8}}>✦</span></span>
        ))}
      </div>
    </div>
    {/* Top/bottom comic stripes */}
    <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"#000",opacity:.4}}/>
    <div style={{position:"absolute",bottom:0,left:0,right:0,height:"2px",background:"#000",opacity:.4}}/>
  </div>

  {/* ━━━ STORY ━━━ */}
  <div id="story" style={{position:"relative",padding:"90px 24px",background:"#070707",overflow:"hidden"}}>
    <div className="bgd" style={{position:"absolute",inset:0,opacity:.45}}/>
    <div style={{position:"absolute",top:0,right:0,width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.075) 0%,transparent 70%)",filter:"blur(60px)"}}/>
    <LightningBolt className="lightning-2" size={70} style={{position:"absolute",top:"20%",right:"6%",opacity:.4}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto",zIndex:2}}>
      <div className="fup" style={{textAlign:"center",marginBottom:6}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.4em",textTransform:"uppercase",color:"rgba(196,30,58,.7)"}}>{T.story.eye}</span>
      </div>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center",marginTop:30}}>
        <div className="fup">
          <div className="ffd" style={{lineHeight:.88,position:"relative"}}>
            <span style={{display:"block",color:"rgba(245,243,238,.78)",fontSize:"clamp(2rem,5vw,4.4rem)"}}>{T.story.h1}</span>
            <span className="sg" style={{display:"block",fontSize:"clamp(2.8rem,8vw,7rem)"}}>{T.story.h2}</span>
            <span style={{display:"block",color:"rgba(245,243,238,.5)",fontSize:"clamp(1.8rem,4.5vw,4rem)"}}>{T.story.h3}</span>
          </div>
        </div>
        <div className="fup d1">
          <p style={{fontSize:17,fontWeight:500,lineHeight:1.7,color:"rgba(245,243,238,.88)",marginBottom:16}}>{T.story.p1}</p>
          <p style={{fontSize:14,lineHeight:1.8,color:"rgba(245,243,238,.55)"}}>{T.story.p2}</p>
          <div style={{height:1,width:60,background:"linear-gradient(to right,rgba(196,30,58,.6),transparent)",marginTop:22}}/>
        </div>
      </div>
      <div className="mob-2col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:48}}>
        {T.story.stats.map((s,i)=>(
          <div key={i} className={"fup cb d"+(i+1)+" uc comic-frame"} style={{background:"#0e0e0e",borderRadius:14,padding:"22px 14px",textAlign:"center",cursor:"default",position:"relative"}}>
            <div className="ffd" style={{fontSize:"clamp(22px,3.5vw,36px)",color:R,lineHeight:1,textShadow:"0 0 20px rgba(196,30,58,.5)"}}>{s.n}</div>
            <div style={{fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(245,243,238,.42)",fontWeight:700,marginTop:6}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ━━━ MENU ━━━ */}
  <div id="menu" style={{position:"relative",padding:"90px 24px",background:"#060606",overflow:"hidden"}}>
    <div className="bgh-anim" style={{position:"absolute",inset:0,opacity:.3}}/>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,#040404,transparent,#040404)",pointerEvents:"none"}}/>
    <LightningBolt className="lightning-3" size={90} style={{position:"absolute",top:"8%",left:"4%",opacity:.5}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto",zIndex:2}}>
      <div className="fup" style={{textAlign:"center",marginBottom:44,position:"relative"}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.4em",textTransform:"uppercase",color:"rgba(196,30,58,.7)",display:"block",marginBottom:12}}>{T.menu.eye}</span>
        <div className="ffd" style={{lineHeight:.86,position:"relative",display:"inline-block"}}>
          <span style={{display:"block",color:W,fontSize:"clamp(2.5rem,7vw,5.8rem)"}}>{T.menu.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(2.5rem,7vw,5.8rem)",textShadow:"0 0 30px rgba(196,30,58,.6)"}}>{T.menu.h2}</span>
          <div className="mob-hide" style={{position:"absolute",top:"-22px",right:"-72px",transform:"rotate(18deg)"}}>
            <ComicBurst sz={66} color="#C41E3A" fill="#D4AF37" label="!"/>
          </div>
        </div>
      </div>
      <div className="nsc" style={{display:"flex",gap:8,paddingBottom:8,marginBottom:24,justifyContent:"center",flexWrap:"wrap"}}>
        {T.menu.cats.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} className="bl" style={{whiteSpace:"nowrap",flexShrink:0,padding:"10px 18px",borderRadius:100,fontSize:13,fontWeight:700,border:"1px solid",fontFamily:ff,cursor:"pointer",transition:"all .3s",background:cat===c.id?R:"#111",color:cat===c.id?"white":"rgba(245,243,238,.5)",borderColor:cat===c.id?R:"rgba(255,255,255,.08)",boxShadow:cat===c.id?"0 0 22px rgba(196,30,58,.5)":"none"}}>{c.l}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filtered.map((item,i)=>(
          <div key={item.id} className="tilt-card" onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{animation:"hi .55s cubic-bezier(.16,1,.3,1) "+(i*.065)+"s both"}}>
            <div className="tilt-inner mc cb" style={{background:"linear-gradient(155deg,#0e0e0e 0%,#0a0608 100%)",borderRadius:16,padding:18,position:"relative",overflow:"hidden",transition:"transform .4s cubic-bezier(.16,1,.3,1)"}}>
              <div style={{position:"absolute",top:0,right:0,width:54,height:54,borderTop:"1px solid rgba(196,30,58,.12)",borderRight:"1px solid rgba(196,30,58,.12)",borderTopRightRadius:16}}/>
              <div style={{position:"absolute",bottom:0,left:0,width:54,height:54,borderBottom:"1px solid rgba(196,30,58,.12)",borderLeft:"1px solid rgba(196,30,58,.12)",borderBottomLeftRadius:16}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,position:"relative",zIndex:1}}>
                <span style={{fontSize:"1.8rem",lineHeight:1,filter:"drop-shadow(0 0 10px rgba(196,30,58,.4))"}}>{item.e}</span>
                <Badge type={item.b} lang={lang}/>
              </div>
              <h3 className="ffd" style={{fontSize:20,lineHeight:1.1,marginBottom:7,color:W,position:"relative",zIndex:1}}>{item.n[lang]}</h3>
              <p style={{fontSize:12.5,color:"rgba(245,243,238,.44)",lineHeight:1.6,marginBottom:14,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",position:"relative",zIndex:1}}>{item.d[lang]}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1}}>
                <span className="ffd" style={{fontSize:20,color:R,textShadow:"0 0 12px rgba(196,30,58,.4)"}}>{item.p} €</span>
                <a href="https://wa.me/4917642573274" className="bl" style={{fontSize:11,padding:"5px 13px",border:"1px solid rgba(196,30,58,.32)",borderRadius:100,color:R,fontWeight:700,textDecoration:"none",fontFamily:ff,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background=R;e.currentTarget.style.color="white"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=R}}>{T.menu.ob}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ━━━ FEATURED BURGER ━━━ */}
  <div style={{position:"relative",padding:"100px 24px",background:"linear-gradient(135deg,#040404,#0a0208,#080104)",overflow:"hidden"}}>
    <div style={{position:"absolute",right:0,top:0,bottom:0,width:"55%",background:"radial-gradient(ellipse 80% 80% at 85% 50%,rgba(196,30,58,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
    <div className="bgh" style={{position:"absolute",inset:0,opacity:.22}}/>
    <LightningBolt className="lightning-1" size={150} style={{position:"absolute",top:"12%",left:"3%"}}/>
    <LightningBolt className="lightning-3" size={110} color="#D4AF37" style={{position:"absolute",bottom:"18%",right:"5%",transform:"rotate(20deg)"}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto",zIndex:2}}>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center"}}>
        <div className="fup">
          <span className="sg" style={{fontSize:11,fontWeight:700,letterSpacing:"0.36em",textTransform:"uppercase"}}>{T.feat.eye}</span>
          <div style={{marginTop:14,marginBottom:18}}>
            <div className="comic-shake" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 16px",background:"rgba(196,30,58,.15)",border:"1px solid rgba(196,30,58,.35)",borderRadius:100,fontSize:11,fontWeight:700,letterSpacing:"0.24em",textTransform:"uppercase",color:R,marginBottom:14,boxShadow:"0 0 22px rgba(196,30,58,.3)"}}>
              <Zap size={11} fill={R}/>{T.feat.crown}
            </div>
            <div className="ffd" style={{lineHeight:.86}}>
              <span style={{display:"block",color:W,fontSize:"clamp(3rem,8vw,7rem)"}}>{T.feat.n1}</span>
              <span className="tgr" style={{display:"block",color:R,fontSize:"clamp(2.4rem,6.5vw,5.5rem)"}}>{T.feat.n2}</span>
            </div>
          </div>
          <p style={{fontSize:14.5,color:"rgba(245,243,238,.55)",lineHeight:1.75,marginBottom:22,maxWidth:440}}>{T.feat.desc}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:26}}>
            {T.feat.chips.map((f,i)=>(<span key={i} style={{padding:"6px 14px",fontSize:11,border:"1px solid rgba(196,30,58,.25)",borderRadius:100,color:"rgba(245,243,238,.6)",fontWeight:500,background:"rgba(196,30,58,.04)"}}>✦ {f}</span>))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:22,flexWrap:"wrap"}}>
            <span className="ffd sg" style={{fontSize:"clamp(2.2rem,4.5vw,3.2rem)"}}>{T.feat.price}</span>
            <a href="https://wa.me/4917642573274" className="gr bl" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 28px",background:R,color:"white",borderRadius:100,fontSize:14,fontWeight:700,textDecoration:"none",fontFamily:ff}} onMouseEnter={e=>e.currentTarget.style.background="#A01630"} onMouseLeave={e=>e.currentTarget.style.background=R}>
              <MessageCircle size={16}/>{T.feat.cta}
            </a>
          </div>
        </div>
        <div className="fup d2" style={{display:"flex",justifyContent:"center"}}>
          <div style={{position:"relative",width:280,height:280,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {/* Outer rotating ring */}
            <svg width="280" height="280" viewBox="0 0 280 280" className="spin-slow" style={{position:"absolute",inset:0}}>
              <circle cx="140" cy="140" r="135" fill="none" stroke="rgba(196,30,58,.35)" strokeWidth="1" strokeDasharray="6 8"/>
              <circle cx="140" cy="20" r="4" fill="#C41E3A"/>
              <circle cx="140" cy="260" r="4" fill="#D4AF37"/>
              <circle cx="20" cy="140" r="3" fill="#C41E3A"/>
              <circle cx="260" cy="140" r="3" fill="#C41E3A"/>
            </svg>
            {/* Middle reverse-rotating ring */}
            <svg width="240" height="240" viewBox="0 0 240 240" className="spin-rev" style={{position:"absolute"}}>
              <circle cx="120" cy="120" r="115" fill="none" stroke="rgba(212,175,55,.3)" strokeWidth="1" strokeDasharray="2 6"/>
            </svg>
            {/* Pulse rings */}
            <div className="pulse-ring" style={{width:240,height:240}}/>
            <div className="pulse-ring pulse-ring-2" style={{width:240,height:240}}/>
            <div className="pulse-ring pulse-ring-3" style={{width:240,height:240}}/>
            {/* Inner glow */}
            <div style={{position:"absolute",inset:30,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.3) 0%,transparent 65%)",filter:"blur(30px)"}}/>
            {/* Main burger circle */}
            <div className="pglw mob-burger" style={{position:"relative",width:200,height:200,borderRadius:"50%",border:"1px solid rgba(196,30,58,.3)",background:"radial-gradient(circle,#1a0408 0%,#060202 60%)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2}}>
              <div className="fburg" style={{userSelect:"none"}}><SVGBurger size={170}/></div>
            </div>
            {/* ARYA SIG badge */}
            <div className="gr mob-badge" style={{position:"absolute",top:-6,right:-6,width:72,height:72,borderRadius:"50%",background:R,border:"4px solid #040404",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:3,animation:"fb 2.8s ease-in-out infinite reverse"}}>
              <Star size={12} fill={G} style={{color:G}}/>
              <span className="ffd" style={{fontSize:9,color:"white",textAlign:"center",lineHeight:1.1,marginTop:2}}>ARYA SIG.</span>
            </div>
            {/* Gold price tag */}
            <div className="gg" style={{position:"absolute",bottom:-2,left:"50%",transform:"translateX(-50%)",padding:"6px 22px",background:G,borderRadius:100,whiteSpace:"nowrap",zIndex:3,border:"2px solid #040404"}}>
              <span className="ffd" style={{fontSize:18,color:"#040404"}}>{T.feat.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* ━━━ UNIVERSE ━━━ */}
  <div style={{position:"relative",padding:"90px 24px",background:"#060606",overflow:"hidden"}}>
    <div className="bgd" style={{position:"absolute",inset:0,opacity:.4}}/>
    <LightningBolt className="lightning-2" size={100} color="#D4AF37" style={{position:"absolute",top:"6%",right:"8%",opacity:.5}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto",zIndex:2}}>
      <div className="fup" style={{textAlign:"center",marginBottom:54}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.4em",textTransform:"uppercase",color:"rgba(196,30,58,.7)",display:"block",marginBottom:12}}>{T.univ.eye}</span>
        <div className="ffd" style={{lineHeight:.86}}>
          <span style={{display:"block",color:"rgba(245,243,238,.78)",fontSize:"clamp(2.5rem,6.5vw,5.5rem)"}}>{T.univ.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(3rem,8vw,6.5rem)",textShadow:"0 0 30px rgba(196,30,58,.6)"}}>{T.univ.h2}</span>
        </div>
      </div>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
        {T.univ.cards.map((c,i)=>(
          <div key={i} className={"fup uc comic-frame d"+(i+1)} style={{padding:32,borderRadius:18,background:i===0?"linear-gradient(135deg,#0e0506,#0a0203)":"linear-gradient(135deg,#0c0c0c,#080808)",cursor:"default",position:"relative",overflow:"hidden",border:i===0?"1px solid rgba(196,30,58,.25)":"1px solid rgba(255,255,255,.06)"}}>
            <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.12) 0%,transparent 65%)",filter:"blur(30px)",pointerEvents:"none"}}/>
            <div style={{fontSize:"2.4rem",marginBottom:18,lineHeight:1,filter:"drop-shadow(0 0 18px rgba(196,30,58,.5))",position:"relative",zIndex:1}}>{c.ic}</div>
            <h3 className="ffd" style={{fontSize:24,color:W,marginBottom:12,position:"relative",zIndex:1}}>{c.t}</h3>
            <p style={{fontSize:14,color:"rgba(245,243,238,.5)",lineHeight:1.75,position:"relative",zIndex:1}}>{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ━━━ GALLERY ━━━ */}
  <div id="gallery" style={{position:"relative",padding:"90px 24px",background:"#080808",overflow:"hidden"}}>
    <div className="bgh-anim" style={{position:"absolute",inset:0,opacity:.28}}/>
    <LightningBolt className="lightning-1" size={80} style={{position:"absolute",bottom:"10%",left:"6%",opacity:.45}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto",zIndex:2}}>
      <div className="fup" style={{textAlign:"center",marginBottom:54}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.4em",textTransform:"uppercase",color:"rgba(196,30,58,.7)",display:"block",marginBottom:12}}>{T.gal.eye}</span>
        <div className="ffd" style={{lineHeight:.86}}>
          <span style={{display:"block",color:W,fontSize:"clamp(3rem,8vw,6.5rem)"}}>{T.gal.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(3rem,8vw,6.5rem)",textShadow:"0 0 30px rgba(196,30,58,.6)"}}>{T.gal.h2}</span>
        </div>
      </div>
      <div className="mob-2col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {T.gal.cells.map((c,i)=>(
          <div key={i} className={"fup d"+(Math.min(i+1,4))} style={{aspectRatio:"1/1",border:"1px solid rgba(255,255,255,.06)",borderRadius:18,overflow:"hidden",position:"relative",cursor:"pointer",background:["linear-gradient(135deg,#1a0506,#080202)","linear-gradient(135deg,#050514,#020208)","linear-gradient(135deg,#050f05,#020802)","linear-gradient(135deg,#14080a,#0a0305)","linear-gradient(135deg,#0a0510,#060208)","linear-gradient(135deg,#100a05,#080402)"][i],transition:"all .35s ease"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.4)";e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.boxShadow="0 0 30px rgba(196,30,58,.25)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.06)";e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none"}}>
            <div style={{position:"absolute",inset:8,border:"1px solid rgba(255,255,255,.05)",borderRadius:12}}/>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:16}}>
              <div style={{fontSize:"2.8rem",opacity:.25,marginBottom:10,lineHeight:1,filter:"drop-shadow(0 0 18px rgba(196,30,58,.4))"}}>{c.e}</div>
              <div className="ffd" style={{fontSize:16,color:"rgba(245,243,238,.28)"}}>{c.l}</div>
              <div style={{fontSize:10,color:"rgba(245,243,238,.16)",marginTop:5,letterSpacing:"0.2em",textTransform:"uppercase"}}>{c.s}</div>
            </div>
            <div style={{position:"absolute",top:12,right:12,width:8,height:8,borderRadius:"50%",background:R,opacity:.4,boxShadow:"0 0 10px rgba(196,30,58,.5)"}}/>
          </div>
        ))}
      </div>
      <div className="fup" style={{textAlign:"center",marginTop:36}}>
        <a href="https://instagram.com/arya_hausderhelden" className="bl" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 26px",border:"1px solid rgba(255,255,255,.12)",borderRadius:100,color:"rgba(245,243,238,.55)",fontSize:13,fontWeight:700,textDecoration:"none",fontFamily:ff,transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.25)";e.currentTarget.style.color="rgba(245,243,238,.85)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.12)";e.currentTarget.style.color="rgba(245,243,238,.55)"}}>
          <Instagram size={16}/>{lang==="de"?"Mehr auf Instagram":"بیشتر در اینستاگرام"}
        </a>
      </div>
    </div>
  </div>

  {/* ━━━ CONTACT ━━━ */}
  <div id="contact" style={{position:"relative",padding:"90px 24px",background:"#040404",overflow:"hidden"}}>
    <div className="bgd" style={{position:"absolute",inset:0,opacity:.32}}/>
    <LightningBolt className="lightning-3" size={90} color="#D4AF37" style={{position:"absolute",top:"15%",right:"4%",opacity:.4}}/>
    <div style={{position:"relative",maxWidth:1160,margin:"0 auto",zIndex:2}}>
      <div className="fup" style={{textAlign:"center",marginBottom:54}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.4em",textTransform:"uppercase",color:"rgba(196,30,58,.7)",display:"block",marginBottom:12}}>{T.contact.eye}</span>
        <div className="ffd" style={{lineHeight:.86}}>
          <span style={{display:"block",color:"rgba(245,243,238,.78)",fontSize:"clamp(2.5rem,7vw,5.5rem)"}}>{T.contact.h1}</span>
          <span style={{display:"block",color:R,fontSize:"clamp(3rem,8vw,6.5rem)",textShadow:"0 0 30px rgba(196,30,58,.6)"}}>{T.contact.h2}</span>
        </div>
      </div>
      <div className="mob-1col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div className="fup cb comic-frame" style={{background:"linear-gradient(155deg,#0e0e0e,#080606)",borderRadius:20,padding:32,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,30,58,.1) 0%,transparent 65%)",filter:"blur(30px)"}}/>
          {[{ic:<MapPin size={18} style={{color:R}}/>,lbl:T.contact.lbl.addr,val:<>Kölner Str. 220<br/>40227 Düsseldorf</>,href:null},{ic:<Phone size={18} style={{color:R}}/>,lbl:T.contact.lbl.ph,val:"+49 176 4257 3274",href:"tel:+4917642573274"},{ic:<Instagram size={18} style={{color:R}}/>,lbl:T.contact.lbl.ig,val:"@arya_hausderhelden",href:"https://instagram.com/arya_hausderhelden"}].map((row,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"15px 0",borderBottom:"1px solid rgba(255,255,255,.06)",position:"relative",zIndex:1}}>
              <div className="glowp" style={{width:42,height:42,borderRadius:12,background:"rgba(196,30,58,.12)",border:"1px solid rgba(196,30,58,.22)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{row.ic}</div>
              <div>
                <div style={{fontSize:9,color:"rgba(245,243,238,.42)",textTransform:"uppercase",letterSpacing:"0.24em",fontWeight:700,marginBottom:5}}>{row.lbl}</div>
                {row.href?<a href={row.href} style={{fontWeight:600,color:W,textDecoration:"none",fontFamily:ff,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=R} onMouseLeave={e=>e.currentTarget.style.color=W}>{row.val}</a>:<div style={{fontWeight:600}}>{row.val}</div>}
              </div>
            </div>
          ))}
          <div style={{paddingTop:18,position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <Clock size={13} style={{color:R}}/><span style={{fontSize:9,color:"rgba(245,243,238,.42)",textTransform:"uppercase",letterSpacing:"0.24em",fontWeight:700}}>{T.contact.lbl.hrs}</span>
            </div>
            {T.contact.hours.map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:13}}>
                <span style={{color:"rgba(245,243,238,.65)"}}>{r.d}</span>
                <span style={{fontWeight:600}}>{r.h}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="fup d1">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            {[{l:lang==="de"?"WhatsApp schreiben":"واتساپ",href:"https://wa.me/4917642573274",bg:"#25D366",ic:<MessageCircle size={20}/>},{l:lang==="de"?"Anrufen":"تماس",href:"tel:+4917642573274",bg:R,ic:<Phone size={20}/>},{l:lang==="de"?"Route starten":"مسیریابی",href:"https://maps.app.goo.gl/S6LkGJ9oc5PYYGco6?g_st=ic",bg:"#1c1c1c",ic:<MapPin size={20}/>},{l:lang==="de"?"Instagram folgen":"اینستاگرام",href:"https://instagram.com/arya_hausderhelden",bg:"linear-gradient(135deg,#7c3aed,#db2777)",ic:<Instagram size={20}/>}].map((btn,i)=>(
              <a key={i} href={btn.href} className="bl" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,padding:20,borderRadius:14,background:btn.bg,color:"white",fontWeight:700,fontSize:13,textDecoration:"none",fontFamily:ff,border:"1px solid rgba(255,255,255,.08)",boxShadow:"0 8px 24px rgba(0,0,0,.3)"}}>{btn.ic}{btn.l}</a>
            ))}
          </div>
          <div style={{position:"relative",borderRadius:16,overflow:"hidden",border:"1px solid rgba(196,30,58,.25)",boxShadow:"0 12px 36px rgba(0,0,0,.5),0 0 28px rgba(196,30,58,.15)"}}>
            <iframe
              src="https://maps.google.com/maps?q=K%C3%B6lner+Str.+220,+40227+D%C3%BCsseldorf&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="240"
              style={{border:0,display:"block",filter:"grayscale(.35) contrast(1.08) brightness(.88) saturate(.85)"}}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ARYA – Haus der Helden · Standort"
              allowFullScreen
            />
            <div style={{position:"absolute",top:0,left:0,right:0,height:"50%",background:"linear-gradient(to bottom,rgba(0,0,0,.35),transparent)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:14,left:14,display:"flex",alignItems:"center",gap:8,padding:"6px 12px",background:"rgba(5,5,5,.85)",backdropFilter:"blur(8px)",borderRadius:100,border:"1px solid rgba(196,30,58,.3)",pointerEvents:"none"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:R,boxShadow:"0 0 10px rgba(196,30,58,.9)",animation:"glowPulse 2s ease-in-out infinite"}}/>
              <span className="ffd" style={{fontSize:11,color:W,letterSpacing:"0.1em"}}>ARYA · LIVE STANDORT</span>
            </div>
            <a href="https://maps.app.goo.gl/S6LkGJ9oc5PYYGco6?g_st=ic" target="_blank" rel="noopener noreferrer" className="bl" style={{position:"absolute",bottom:14,right:14,display:"inline-flex",alignItems:"center",gap:6,padding:"8px 16px",background:R,color:"white",borderRadius:100,fontSize:12,fontWeight:700,textDecoration:"none",fontFamily:ff,boxShadow:"0 6px 20px rgba(0,0,0,.5),0 0 18px rgba(196,30,58,.35)"}}>
              <MapPin size={13}/>{T.contact.mapCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* ━━━ FOOTER ━━━ */}
  <footer style={{padding:"42px 24px",background:"#030303",borderTop:"1px solid rgba(255,255,255,.06)",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 100% at 50% 100%,rgba(196,30,58,.08) 0%,transparent 70%)"}}/>
    <div style={{maxWidth:1160,margin:"0 auto",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:18,position:"relative",zIndex:1}}>
      <AryaLogo sz={56}/>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:11,color:"rgba(245,243,238,.22)"}}>{T.footer.r}</div>
        <div style={{fontSize:11,color:"rgba(196,30,58,.55)",marginTop:3}}>{T.footer.m}</div>
        <div style={{fontSize:11,color:"rgba(245,243,238,.32)",marginTop:6}}>Design & Development by <a href="https://parnil.co" target="_blank" rel="noopener noreferrer" style={{color:G,textDecoration:"none",fontWeight:700,letterSpacing:"0.04em"}}>Parnil.co</a></div>
      </div>
      <div style={{display:"flex",gap:9}}>
        {[{h:"https://instagram.com/arya_hausderhelden",ic:<Instagram size={15}/>},{h:"https://wa.me/4917642573274",ic:<MessageCircle size={15}/>},{h:"tel:+4917642573274",ic:<Phone size={15}/>}].map((s,i)=>(
          <a key={i} href={s.h} className="bl" style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(255,255,255,.12)",display:"flex",alignItems:"center",justifyContent:"center",color:W,textDecoration:"none",transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(196,30,58,.5)";e.currentTarget.style.color=R;e.currentTarget.style.boxShadow="0 0 20px rgba(196,30,58,.4)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.12)";e.currentTarget.style.color=W;e.currentTarget.style.boxShadow="none"}}>{s.ic}</a>
        ))}
      </div>
    </div>
  </footer>

  {/* ━━━ MOBILE ACTION BAR ━━━ */}
  <div style={{display:"flex",borderTop:"1px solid rgba(255,255,255,.08)",background:"rgba(10,10,10,.98)",backdropFilter:"blur(20px)",position:"relative",zIndex:30}}>
    <a href="https://wa.me/4917642573274" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,padding:"12px 0",background:R,color:"white",textDecoration:"none",fontFamily:ff,boxShadow:"0 0 24px rgba(196,30,58,.4)"}}>
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
