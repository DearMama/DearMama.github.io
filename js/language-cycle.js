// Line by line, top to bottom. The line you are reading gets one
// translation, then English. Each line further down cycles through
// more of a short set: Chinese, Arabic, Japanese.

(function () {
    const LANGS = ['zh', 'ar', 'ja'];
    const RTL = new Set(['ar']);
    const HOLD = 520;
    const STAGGER = 380;

    const PHRASES = {
        'analyzing threats, securing systems, building production-ready software and developing games.': {
            es: 'Analizando amenazas, asegurando sistemas, creando software listo para producción y desarrollando juegos.',
            fr: 'Analyser les menaces, sécuriser les systèmes, créer des logiciels prêts pour la production et développer des jeux.',
            pt: 'Analisando ameaças, protegendo sistemas, criando software pronto para produção e desenvolvendo jogos.'
        },
        'developing games, building production-ready software that solves real problems, ethical hacking': {
            es: 'Desarrollando juegos, creando software listo para producción que resuelve problemas reales, hacking ético.',
            fr: 'Développer des jeux, créer des logiciels prêts pour la production qui résolvent de vrais problèmes, hacking éthique.',
            pt: 'Desenvolvendo jogos, criando software pronto para produção que resolve problemas reais, hacking ético.'
        },
        'roles': { es: 'Roles', fr: 'Rôles', pt: 'Funções' },
        'focus': { es: 'Enfoque', fr: 'Priorité', pt: 'Foco' },
        'experience': { es: 'Experiencia', fr: 'Expérience', pt: 'Experiência' },
        'soc analyst || security engineering': {
            es: 'Analista SOC || Ingeniería de seguridad',
            fr: 'Analyste SOC || Ingénierie de la sécurité',
            pt: 'Analista de SOC || Engenharia de segurança'
        },
        'full-stack software developer': {
            es: 'Desarrollador de software full-stack',
            fr: 'Développeur logiciel full-stack',
            pt: 'Desenvolvedor de software full-stack'
        },
        'full-stack software engineer': {
            es: 'Ingeniero de software full-stack',
            fr: 'Ingénieur logiciel full-stack',
            pt: 'Engenheiro de software full-stack'
        },
        'game developer': {
            es: 'Desarrollador de juegos',
            fr: 'Développeur de jeux',
            pt: 'Desenvolvedor de jogos'
        },
        'penetration tester': {
            es: 'Pentester',
            fr: 'Testeur d’intrusion',
            pt: 'Testador de invasão'
        },
        'cybersecurity & cryptography/pki': {
            es: 'Ciberseguridad y criptografía/PKI',
            fr: 'Cybersécurité et cryptographie/PKI',
            pt: 'Cibersegurança e criptografia/PKI'
        },
        'saas development & automation': {
            es: 'Desarrollo SaaS y automatización',
            fr: 'Développement SaaS et automatisation',
            pt: 'Desenvolvimento SaaS e automação'
        },
        'saas development automation': {
            es: 'Automatización del desarrollo SaaS',
            fr: 'Automatisation du développement SaaS',
            pt: 'Automação do desenvolvimento SaaS'
        },
        'game design & development': {
            es: 'Diseño y desarrollo de juegos',
            fr: 'Conception et développement de jeux',
            pt: 'Design e desenvolvimento de jogos'
        },
        'game development': {
            es: 'Desarrollo de juegos',
            fr: 'Développement de jeux',
            pt: 'Desenvolvimento de jogos'
        },
        'ethical hacking': {
            es: 'Hacking ético',
            fr: 'Hacking éthique',
            pt: 'Hacking ético'
        },
        '2+ years': { es: 'Más de 2 años', fr: 'Plus de 2 ans', pt: 'Mais de 2 anos' },
        '3+ years': { es: 'Más de 3 años', fr: 'Plus de 3 ans', pt: 'Mais de 3 anos' },
        '4+ years': { es: 'Más de 4 años', fr: 'Plus de 4 ans', pt: 'Mais de 4 anos' },
        '5+ years': { es: 'Más de 5 años', fr: 'Plus de 5 ans', pt: 'Mais de 5 anos' },
        'background': { es: 'Trayectoria', fr: 'Parcours', pt: 'Trajetória' },
        'about': { es: 'Acerca de', fr: 'À propos', pt: 'Sobre' },
        'portfolio': { es: 'Portafolio', fr: 'Portfolio', pt: 'Portfólio' },
        'selected work': { es: 'Trabajo seleccionado', fr: 'Travaux choisis', pt: 'Trabalho selecionado' },
        'get in touch': { es: 'Contacto', fr: 'Contact', pt: 'Contato' },
        "let's connect": { es: 'Conectemos', fr: 'Échangeons', pt: 'Vamos conversar' },
        'read more': { es: 'Seguir leyendo', fr: 'Lire la suite', pt: 'Leia mais' },
        'featured project': { es: 'Proyecto destacado', fr: 'Projet en vedette', pt: 'Projeto em destaque' },
        'technical expertise': { es: 'Experiencia técnica', fr: 'Expertise technique', pt: 'Especialização técnica' },
        'full-stack development': { es: 'Desarrollo full-stack', fr: 'Développement full-stack', pt: 'Desenvolvimento full-stack' },
        'soc analyst': { es: 'Analista SOC', fr: 'Analyste SOC', pt: 'Analista de SOC' },
        'security & systems': { es: 'Seguridad y sistemas', fr: 'Sécurité et systèmes', pt: 'Segurança e sistemas' },
        'tools & automation': { es: 'Herramientas y automatización', fr: 'Outils et automatisation', pt: 'Ferramentas e automação' },
        'ai translation messaging': {
            es: 'Mensajería con traducción por IA',
            fr: 'Messagerie de traduction par IA',
            pt: 'Mensagens com tradução por IA'
        },
        'software license management system': {
            es: 'Sistema de gestión de licencias de software',
            fr: 'Système de gestion de licences logicielles',
            pt: 'Sistema de gestão de licenças de software'
        },
        'video/mobile game development': {
            es: 'Desarrollo de videojuegos y juegos móviles',
            fr: 'Développement de jeux vidéo et mobiles',
            pt: 'Desenvolvimento de videojogos e jogos móveis'
        },
        "i'm a cybersecurity analyst & full-stack software engineer focused on threat detection, security operations, building secure systems and game development.": {
            es: 'Soy analista de ciberseguridad e ingeniero de software full-stack, enfocado en la detección de amenazas, las operaciones de seguridad, los sistemas seguros y el desarrollo de juegos.',
            fr: 'Je suis analyste en cybersécurité et ingénieur logiciel full-stack, concentré sur la détection des menaces, les opérations de sécurité, les systèmes sûrs et le développement de jeux.',
            pt: 'Sou analista de cibersegurança e engenheiro de software full-stack, focado em detecção de ameaças, operações de segurança, sistemas seguros e desenvolvimento de jogos.'
        },
        'full-stack software engineer with hands on experience in game development and ethical hacking, building secure, production-ready solutions that solve real problems.': {
            es: 'Ingeniero de software full-stack con experiencia práctica en desarrollo de juegos y hacking ético, creando soluciones seguras y listas para producción que resuelven problemas reales.',
            fr: 'Ingénieur logiciel full-stack avec une expérience concrète du développement de jeux et du hacking éthique, créant des solutions sûres et prêtes pour la production qui résolvent de vrais problèmes.',
            pt: 'Engenheiro de software full-stack com experiência prática em desenvolvimento de jogos e hacking ético, criando soluções seguras e prontas para produção que resolvem problemas reais.'
        },
        'with 5+ years of experience, i specialize in building secure, scalable saas platforms. i helped create keymint.dev, a developer-first licensing system serving enterprise users; working on secure api design, authentication, digital signatures, jwt, tls, and cryptographic license validation. my work emphasizes clean code, maintainability, and user experience. i also contributed to the development of puzzle scout & africa\'s legends a mobile game app when i was a game developer intern at leti arts ghana.': {
            es: 'Con más de 5 años de experiencia, me especializo en plataformas SaaS seguras y escalables. Ayudé a crear Keymint.dev, un sistema de licencias pensado para desarrolladores y empresas, trabajando en APIs seguras, autenticación, firmas digitales, JWT, TLS y validación criptográfica de licencias. Mi trabajo prioriza el código limpio, el mantenimiento y la experiencia de usuario. También contribuí a Puzzle Scout y Africa’s Legends, un juego móvil, como pasante de desarrollo en Leti Arts Ghana.',
            fr: 'Avec plus de 5 ans d’expérience, je me spécialise dans les plateformes SaaS sûres et évolutives. J’ai aidé à créer Keymint.dev, un système de licences pensé pour les développeurs et les entreprises, en travaillant sur des API sûres, l’authentification, les signatures numériques, JWT, TLS et la validation cryptographique des licences. Mon travail privilégie un code clair, la maintenabilité et l’expérience utilisateur. J’ai aussi contribué à Puzzle Scout et Africa’s Legends, un jeu mobile, comme stagiaire en développement chez Leti Arts Ghana.',
            pt: 'Com mais de 5 anos de experiência, especializo-me em plataformas SaaS seguras e escaláveis. Ajudei a criar o Keymint.dev, um sistema de licenças feito para desenvolvedores e empresas, trabalhando em APIs seguras, autenticação, assinaturas digitais, JWT, TLS e validação criptográfica de licenças. Meu trabalho prioriza código limpo, manutenção e experiência do usuário. Também contribuí para Puzzle Scout e Africa’s Legends, um jogo móvel, como estagiário de desenvolvimento na Leti Arts Ghana.'
        },
        'with 5+ years of experience, i specialize in building secure, scalable saas platforms. i helped create keymint.dev, a developer-first licensing system serving enterprise users.': {
            es: 'Con más de 5 años de experiencia, me especializo en plataformas SaaS seguras y escalables. Ayudé a crear Keymint.dev, un sistema de licencias pensado para desarrolladores y empresas.',
            fr: 'Avec plus de 5 ans d’expérience, je me spécialise dans les plateformes SaaS sûres et évolutives. J’ai aidé à créer Keymint.dev, un système de licences pensé pour les développeurs et les entreprises.',
            pt: 'Com mais de 5 anos de experiência, especializo-me em plataformas SaaS seguras e escaláveis. Ajudei a criar o Keymint.dev, um sistema de licenças feito para desenvolvedores e empresas.'
        },
        'i also contributed to the development of puzzle scout & africa\'s legends, a mobile game app when i was a game developer intern at leti arts ghana.': {
            es: 'También contribuí a Puzzle Scout y Africa’s Legends, un juego móvil, cuando fui pasante de desarrollo de juegos en Leti Arts Ghana.',
            fr: 'J’ai aussi contribué à Puzzle Scout et Africa’s Legends, un jeu mobile, lorsque j’étais stagiaire en développement de jeux chez Leti Arts Ghana.',
            pt: 'Também contribuí para Puzzle Scout e Africa’s Legends, um jogo móvel, quando fui estagiário de desenvolvimento de jogos na Leti Arts Ghana.'
        },
        'my cybersecurity interests center on soc operations, threat detection, incident response, network security, cryptography, and pki. i work with tools and technologies such as splunk, microsoft sentinel, wireshark, linux, python, and openssl to investigate security events, analyze system activity, and strengthen defensive controls.': {
            es: 'Mis intereses en ciberseguridad se centran en operaciones SOC, detección de amenazas, respuesta a incidentes, seguridad de redes, criptografía y PKI. Trabajo con Splunk, Microsoft Sentinel, Wireshark, Linux, Python y OpenSSL para investigar eventos, analizar la actividad del sistema y reforzar los controles defensivos.',
            fr: 'Mes intérêts en cybersécurité portent sur les opérations SOC, la détection des menaces, la réponse aux incidents, la sécurité réseau, la cryptographie et la PKI. Je travaille avec Splunk, Microsoft Sentinel, Wireshark, Linux, Python et OpenSSL pour enquêter sur les événements, analyser l’activité système et renforcer les contrôles défensifs.',
            pt: 'Meus interesses em cibersegurança estão em operações de SOC, detecção de ameaças, resposta a incidentes, segurança de rede, criptografia e PKI. Trabalho com Splunk, Microsoft Sentinel, Wireshark, Linux, Python e OpenSSL para investigar eventos, analisar a atividade do sistema e reforçar os controles defensivos.'
        },
        'every alert tells an interesting story. the challenge is knowing which ones matter.': {
            es: 'Cada alerta cuenta una historia interesante. El reto es saber cuáles importan.',
            fr: 'Chaque alerte raconte une histoire intéressante. Le défi est de savoir lesquelles comptent.',
            pt: 'Cada alerta conta uma história interessante. O desafio é saber quais importam.'
        },
        'building software isn\'t just about writing code—it\'s about understanding problems deeply and crafting solutions that stand the test of time.': {
            es: 'Crear software no es solo escribir código: es entender los problemas a fondo y diseñar soluciones que duren.',
            fr: 'Créer un logiciel ne se résume pas à écrire du code : c’est comprendre les problèmes en profondeur et concevoir des solutions qui durent.',
            pt: 'Criar software não é só escrever código: é entender os problemas a fundo e desenhar soluções que durem.'
        },
        'a collection of projects i have contributed to the development of, demonstrating hands-on experience across software development and game development.': {
            es: 'Una selección de proyectos en los que contribuí, con experiencia práctica en desarrollo de software y de juegos.',
            fr: 'Une sélection de projets auxquels j’ai contribué, avec une expérience concrète du développement logiciel et du jeu.',
            pt: 'Uma seleção de projetos nos quais contribuí, com experiência prática em desenvolvimento de software e de jogos.'
        },
        'messaging that keeps tone, slang, and dialect while translating between languages. write the way you think, and read replies in your own language.': {
            es: 'Mensajería que conserva el tono, la jerga y el dialecto al traducir entre idiomas. Escribe como piensas y lee las respuestas en tu propio idioma.',
            fr: 'Une messagerie qui garde le ton, l’argot et le dialecte en traduisant d’une langue à l’autre. Écrivez comme vous pensez, et lisez les réponses dans votre langue.',
            pt: 'Mensagens que preservam o tom, a gíria e o dialeto ao traduzir entre idiomas. Escreva como pensa e leia as respostas no seu próprio idioma.'
        },
        'developer-first licensing platform with cryptographic signature validation. supports offline/online modes, serving 100+ active users with enterprise-grade security.': {
            es: 'Plataforma de licencias pensada para desarrolladores, con validación por firma criptográfica. Funciona sin conexión y en línea, y sirve a más de 100 usuarios activos con seguridad de nivel empresarial.',
            fr: 'Plateforme de licences pensée pour les développeurs, avec validation par signature cryptographique. Modes hors ligne et en ligne, pour plus de 100 utilisateurs actifs, avec une sécurité de niveau entreprise.',
            pt: 'Plataforma de licenças feita para desenvolvedores, com validação por assinatura criptográfica. Funciona offline e online, atendendo mais de 100 usuários ativos com segurança de nível empresarial.'
        },
        'secure, scalable licensing infrastructure for developers. features rest api, vendor dashboard, and real-time analytics.': {
            es: 'Infraestructura de licencias segura y escalable para desarrolladores. Incluye API REST, panel para proveedores y analítica en tiempo real.',
            fr: 'Infrastructure de licences sûre et évolutive pour les développeurs. API REST, tableau de bord fournisseur et analytique en temps réel.',
            pt: 'Infraestrutura de licenças segura e escalável para desenvolvedores. Inclui API REST, painel do fornecedor e análise em tempo real.'
        },
        'video game development studio focused on creating immersive experiences for players. specializes in mobile and pc platforms, with a portfolio of successful titles.': {
            es: 'Estudio de videojuegos dedicado a experiencias inmersivas. Se especializa en móvil y PC, con un portafolio de títulos de éxito.',
            fr: 'Studio de jeux vidéo dédié aux expériences immersives. Spécialisé dans le mobile et le PC, avec un portfolio de titres à succès.',
            pt: 'Estúdio de videojogos dedicado a experiências imersivas. Especializado em celular e PC, com um portfólio de títulos de sucesso.'
        },
        'video game development studio focused on creating immersive experiences for playersspecializes in mobile and pc platforms, with a portfolio of successful titles.': {
            es: 'Estudio de videojuegos dedicado a experiencias inmersivas. Se especializa en móvil y PC, con un portafolio de títulos de éxito.',
            fr: 'Studio de jeux vidéo dédié aux expériences immersives. Spécialisé dans le mobile et le PC, avec un portfolio de titres à succès.',
            pt: 'Estúdio de videojogos dedicado a experiências imersivas. Especializado em celular e PC, com um portfólio de títulos de sucesso.'
        },
        "i'm always open to discussing new projects, game developers, collaboration opportunities, or simply connecting with fellow developers and entrepreneurs. whether you have a product idea, need technical consulting, or want to explore working together, i'd love to hear from you.": {
            es: 'Siempre estoy abierto a nuevos proyectos, al desarrollo de juegos y a colaborar, o simplemente a conectar con otros desarrolladores y emprendedores. Si tienes una idea, necesitas consultoría técnica o quieres trabajar juntos, me encantará leerte.',
            fr: 'Je suis toujours ouvert aux nouveaux projets, au développement de jeux et aux collaborations, ou simplement à échanger avec d’autres développeurs et entrepreneurs. Une idée de produit, un besoin de conseil technique, ou l’envie de travailler ensemble : écrivez-moi.',
            pt: 'Estou sempre aberto a novos projetos, ao desenvolvimento de jogos e a colaborações, ou simplesmente a conversar com outros desenvolvedores e empreendedores. Se você tem uma ideia, precisa de consultoria técnica ou quer trabalhar junto, vou gostar de ouvir você.'
        },
        "open to new projects and collaborations. whether you have a product idea or need technical consulting, i'd love to hear from you.": {
            es: 'Abierto a nuevos proyectos y colaboraciones. Si tienes una idea de producto o necesitas consultoría técnica, me encantará leerte.',
            fr: 'Ouvert aux nouveaux projets et aux collaborations. Une idée de produit ou un besoin de conseil technique : écrivez-moi.',
            pt: 'Aberto a novos projetos e colaborações. Se você tem uma ideia de produto ou precisa de consultoria técnica, vou gostar de ouvir você.'
        }
    };

    const EXTRA = {
        'analyzing threats, securing systems, building production-ready software and developing games.': {
            zh: '分析威胁，保护系统，构建可上线的软件，并开发游戏。',
            ja: '脅威を分析し、システムを守り、本番向けのソフトウェアとゲームをつくる。',
            ko: '위협을 분석하고 시스템을 보호하며, 실서비스용 소프트웨어와 게임을 만듭니다.',
            ar: 'أحلل التهديدات، وأؤمّن الأنظمة، وأبني برمجيات جاهزة للإنتاج، وأطوّر الألعاب.',
            hi: 'खतरों का विश्लेषण, सिस्टम की सुरक्षा, प्रोडक्शन-तैयार सॉफ़्टवेयर और गेम बनाना।',
            ru: 'Анализирую угрозы, защищаю системы, создаю готовое к продакшену ПО и разрабатываю игры.',
            el: 'Αναλύω απειλές, ασφαλίζω συστήματα, φτιάχνω λογισμικό έτοιμο για παραγωγή και αναπτύσσω παιχνίδια.',
            he: 'מנתח איומים, מאבטח מערכות, בונה תוכנה מוכנה לייצור ומפתח משחקים.'
        },
        'developing games, building production-ready software that solves real problems, ethical hacking': {
            zh: '开发游戏，构建解决真实问题的可上线软件，进行道德黑客测试。',
            ja: 'ゲームを開発し、現実の問題を解く本番向けソフトウェアを作り、倫理的ハッキングを行う。',
            ko: '게임을 개발하고, 실제 문제를 푸는 실서비스 소프트웨어를 만들며, 윤리적 해킹을 합니다.',
            ar: 'تطوير الألعاب، وبناء برمجيات جاهزة للإنتاج تحل مشكلات حقيقية، والاختراق الأخلاقي.',
            hi: 'गेम बनाना, असली समस्याओं को हल करने वाला प्रोडक्शन-तैयार सॉफ़्टवेयर, एथिकल हैकिंग।',
            ru: 'Разработка игр, готовое к продакшену ПО для реальных задач и этичный хакинг.',
            el: 'Ανάπτυξη παιχνιδιών, λογισμικό έτοιμο για παραγωγή που λύνει πραγματικά προβλήματα, ηθικό hacking.',
            he: 'פיתוח משחקים, תוכנה מוכנה לייצור שפותרת בעיות אמיתיות, והאקינג אתי.'
        },
        'roles': { zh: '角色', ja: '役割', ko: '역할', ar: 'أدوار', hi: 'भूमिकाएँ', ru: 'Роли', el: 'Ρόλοι', he: 'תפקידים' },
        'focus': { zh: '重点', ja: '焦点', ko: '초점', ar: 'تركيز', hi: 'फ़ोकस', ru: 'Фокус', el: 'Εστίαση', he: 'מיקוד' },
        'experience': { zh: '经验', ja: '経験', ko: '경력', ar: 'خبرة', hi: 'अनुभव', ru: 'Опыт', el: 'Εμπειρία', he: 'ניסיון' },
        'soc analyst || security engineering': {
            zh: 'SOC 分析师 || 安全工程', ja: 'SOCアナリスト || セキュリティエンジニアリング', ko: 'SOC 분석가 || 보안 엔지니어링',
            ar: 'محلل مركز عمليات أمنية || هندسة الأمن', hi: 'SOC विश्लेषक || सुरक्षा इंजीनियरिंग', ru: 'Аналитик SOC || инженерия безопасности',
            el: 'Αναλυτής SOC || μηχανική ασφάλειας', he: 'אנליסט SOC || הנדסת אבטחה'
        },
        'full-stack software developer': {
            zh: '全栈软件开发者', ja: 'フルスタックのソフトウェア開発者', ko: '풀스택 소프트웨어 개발자',
            ar: 'مطوّر برمجيات متكامل', hi: 'फुल-स्टैक सॉफ़्टवेयर डेवलपर', ru: 'Фулстек-разработчик',
            el: 'Προγραμματιστής full-stack', he: 'מפתח תוכנה פול-סטאק'
        },
        'full-stack software engineer': {
            zh: '全栈软件工程师', ja: 'フルスタックのソフトウェアエンジニア', ko: '풀스택 소프트웨어 엔지니어',
            ar: 'مهندس برمجيات متكامل', hi: 'फुल-स्टैक सॉफ़्टवेयर इंजीनियर', ru: 'Фулстек-инженер',
            el: 'Μηχανικός λογισμικού full-stack', he: 'מהנדס תוכנה פול-סטאק'
        },
        'game developer': { zh: '游戏开发者', ja: 'ゲーム開発者', ko: '게임 개발자', ar: 'مطوّر ألعاب', hi: 'गेम डेवलपर', ru: 'Разработчик игр', el: 'Προγραμματιστής παιχνιδιών', he: 'מפתח משחקים' },
        'penetration tester': { zh: '渗透测试员', ja: 'ペネトレーションテスター', ko: '모의 침투 테스터', ar: 'مختبر اختراق', hi: 'पेनिट्रेशन टेस्टर', ru: 'Пентестер', el: 'Ελεγκτής διείσδυσης', he: 'בודק חדירות' },
        'cybersecurity & cryptography/pki': {
            zh: '网络安全与密码学/PKI', ja: 'サイバーセキュリティと暗号/PKI', ko: '사이버보안과 암호학/PKI',
            ar: 'الأمن السيبراني والتشفير/PKI', hi: 'साइबर सुरक्षा और क्रिप्टोग्राफ़ी/PKI', ru: 'Кибербезопасность и криптография/PKI',
            el: 'Κυβερνοασφάλεια και κρυπτογραφία/PKI', he: 'סייבר ואבטחת הצפנה/PKI'
        },
        'saas development & automation': {
            zh: 'SaaS 开发与自动化', ja: 'SaaS開発と自動化', ko: 'SaaS 개발과 자동화',
            ar: 'تطوير SaaS والأتمتة', hi: 'SaaS विकास और ऑटोमेशन', ru: 'Разработка SaaS и автоматизация',
            el: 'Ανάπτυξη SaaS και αυτοματισμός', he: 'פיתוח SaaS ואוטומציה'
        },
        'saas development automation': {
            zh: 'SaaS 开发自动化', ja: 'SaaS開発の自動化', ko: 'SaaS 개발 자동화',
            ar: 'أتمتة تطوير SaaS', hi: 'SaaS विकास का ऑटोमेशन', ru: 'Автоматизация разработки SaaS',
            el: 'Αυτοματισμός ανάπτυξης SaaS', he: 'אוטומציה של פיתוח SaaS'
        },
        'game design & development': {
            zh: '游戏设计与开发', ja: 'ゲームデザインと開発', ko: '게임 디자인과 개발',
            ar: 'تصميم الألعاب وتطويرها', hi: 'गेम डिज़ाइन और विकास', ru: 'Дизайн и разработка игр',
            el: 'Σχεδιασμός και ανάπτυξη παιχνιδιών', he: 'עיצוב ופיתוח משחקים'
        },
        'game development': { zh: '游戏开发', ja: 'ゲーム開発', ko: '게임 개발', ar: 'تطوير الألعاب', hi: 'गेम विकास', ru: 'Разработка игр', el: 'Ανάπτυξη παιχνιδιών', he: 'פיתוח משחקים' },
        'ethical hacking': { zh: '道德黑客', ja: '倫理的な侵入テスト', ko: '윤리적 침투', ar: 'الاختراق الأخلاقي', hi: 'नैतिक हैकिंग', ru: 'Этичный взлом', el: 'Ηθική παραβίαση', he: 'פריצה אתית' },
        '2+ years': { zh: '2年以上', ja: '2年以上', ko: '2년 이상', ar: 'أكثر من سنتين', hi: '2+ वर्ष', ru: 'Более 2 лет', el: 'Πάνω από 2 χρόνια', he: 'יותר משנתיים' },
        '3+ years': { zh: '3年以上', ja: '3年以上', ko: '3년 이상', ar: 'أكثر من 3 سنوات', hi: '3+ वर्ष', ru: 'Более 3 лет', el: 'Πάνω από 3 χρόνια', he: 'יותר מ-3 שנים' },
        '4+ years': { zh: '4年以上', ja: '4年以上', ko: '4년 이상', ar: 'أكثر من 4 سنوات', hi: '4+ वर्ष', ru: 'Более 4 лет', el: 'Πάνω από 4 χρόνια', he: 'יותר מ-4 שנים' },
        '5+ years': { zh: '5年以上', ja: '5年以上', ko: '5년 이상', ar: 'أكثر من 5 سنوات', hi: '5+ वर्ष', ru: 'Более 5 лет', el: 'Πάνω από 5 χρόνια', he: 'יותר מ-5 שנים' },
        'background': { zh: '背景', ja: '背景', ko: '배경', ar: 'خلفية', hi: 'पृष्ठभूमि', ru: 'Предыстория', el: 'Υπόβαθρο', he: 'רקע' },
        'about': { zh: '关于', ja: '概要', ko: '소개', ar: 'حول', hi: 'परिचय', ru: 'О себе', el: 'Σχετικά', he: 'אודות' },
        'portfolio': { zh: '作品集', ja: 'ポートフォリオ', ko: '포트폴리오', ar: 'معرض الأعمال', hi: 'पोर्टफोलियो', ru: 'Портфолио', el: 'Χαρτοφυλάκιο', he: 'תיק עבודות' },
        'selected work': { zh: '精选作品', ja: '主な仕事', ko: '주요 작업', ar: 'أعمال مختارة', hi: 'चुनिंदा काम', ru: 'Избранные работы', el: 'Επιλεγμένα έργα', he: 'עבודות נבחרות' },
        'get in touch': { zh: '联系', ja: '連絡する', ko: '연락하기', ar: 'تواصل', hi: 'संपर्क करें', ru: 'Связаться', el: 'Επικοινωνία', he: 'יצירת קשר' },
        "let's connect": { zh: '一起聊聊', ja: 'つながりましょう', ko: '함께 이야기해요', ar: 'لنتواصل', hi: 'जुड़ें', ru: 'Давайте на связи', el: 'Ας συνδεθούμε', he: 'בואו נתחבר' },
        'read more': { zh: '继续阅读', ja: '続きを読む', ko: '더 읽기', ar: 'اقرأ المزيد', hi: 'और पढ़ें', ru: 'Читать дальше', el: 'Διαβάστε περισσότερα', he: 'המשך קריאה' },
        'featured project': { zh: '精选项目', ja: '注目のプロジェクト', ko: '주요 프로젝트', ar: 'مشروع مميز', hi: 'प्रमुख प्रोजेक्ट', ru: 'Избранный проект', el: 'Προβεβλημένο έργο', he: 'פרויקט מוביל' },
        'technical expertise': { zh: '技术专长', ja: '技術的な専門性', ko: '기술 전문성', ar: 'خبرة تقنية', hi: 'तकनीकी विशेषज्ञता', ru: 'Техническая экспертиза', el: 'Τεχνική εξειδίκευση', he: 'מומחיות טכנית' },
        'full-stack development': { zh: '全栈开发', ja: 'フルスタック開発', ko: '풀스택 개발', ar: 'تطوير متكامل', hi: 'फुल-स्टैक विकास', ru: 'Фулстек-разработка', el: 'Ανάπτυξη full-stack', he: 'פיתוח פול-סטאק' },
        'soc analyst': { zh: 'SOC 分析师', ja: 'SOCアナリスト', ko: 'SOC 분석가', ar: 'محلل مركز عمليات أمنية', hi: 'SOC विश्लेषक', ru: 'Аналитик SOC', el: 'Αναλυτής SOC', he: 'אנליסט SOC' },
        'security & systems': { zh: '安全与系统', ja: 'セキュリティとシステム', ko: '보안과 시스템', ar: 'الأمن والأنظمة', hi: 'सुरक्षा और सिस्टम', ru: 'Безопасность и системы', el: 'Ασφάλεια και συστήματα', he: 'אבטחה ומערכות' },
        'tools & automation': { zh: '工具与自动化', ja: 'ツールと自動化', ko: '도구와 자동화', ar: 'الأدوات والأتمتة', hi: 'उपकरण और ऑटोमेशन', ru: 'Инструменты и автоматизация', el: 'Εργαλεία και αυτοματισμός', he: 'כלים ואוטומציה' },
        'ai translation messaging': {
            zh: '人工智能翻译消息', ja: 'AI翻訳メッセージ', ko: 'AI 번역 메시지',
            ar: 'مراسلة بترجمة الذكاء الاصطناعي', hi: 'AI अनुवाद संदेश', ru: 'Сообщения с ИИ-переводом',
            el: 'Μηνύματα με μετάφραση AI', he: 'הודעות בתרגום בינה מלאכותית'
        },
        'software license management system': {
            zh: '软件许可证管理系统', ja: 'ソフトウェアライセンス管理システム', ko: '소프트웨어 라이선스 관리 시스템',
            ar: 'نظام إدارة تراخيص البرمجيات', hi: 'सॉफ़्टवेयर लाइसेंस प्रबंधन प्रणाली', ru: 'Система управления лицензиями ПО',
            el: 'Σύστημα διαχείρισης αδειών λογισμικού', he: 'מערכת לניהול רישיונות תוכנה'
        },
        'video/mobile game development': {
            zh: '主机与手游开发', ja: 'コンソールとモバイルのゲーム開発', ko: '콘솔·모바일 게임 개발',
            ar: 'تطوير ألعاب الفيديو والجوال', hi: 'वीडियो और मोबाइल गेम विकास', ru: 'Разработка видеоигр и мобильных игр',
            el: 'Ανάπτυξη βιντεοπαιχνιδιών και παιχνιδιών για κινητά', he: 'פיתוח משחקי וידאו ומובייל'
        },
        "i'm a cybersecurity analyst & full-stack software engineer focused on threat detection, security operations, building secure systems and game development.": {
            zh: '我是网络安全分析师和全栈软件工程师，专注威胁检测、安全运营、安全系统构建和游戏开发。',
            ja: '脅威検知、セキュリティ運用、安全なシステムの構築、ゲーム開発に取り組むサイバーセキュリティアナリスト兼フルスタックエンジニアです。',
            ko: '위협 탐지, 보안 운영, 안전한 시스템 구축, 게임 개발에 집중하는 사이버보안 분석가이자 풀스택 엔지니어입니다.',
            ar: 'أنا محلل أمن سيبراني ومهندس برمجيات متكامل، أركز على كشف التهديدات وعمليات الأمن وبناء أنظمة آمنة وتطوير الألعاب.',
            hi: 'मैं साइबर सुरक्षा विश्लेषक और फुल-स्टैक इंजीनियर हूँ, खतरा पहचान, सुरक्षा संचालन, सुरक्षित सिस्टम और गेम विकास पर केंद्रित।',
            ru: 'Я аналитик по кибербезопасности и фулстек-инженер: обнаружение угроз, безопасность, надёжные системы и разработка игр.',
            el: 'Είμαι αναλυτής κυβερνοασφάλειας και μηχανικός full-stack, με έμφαση στην ανίχνευση απειλών, τις λειτουργίες ασφάλειας, τα ασφαλή συστήματα και τα παιχνίδια.',
            he: 'אני אנליסט סייבר ומהנדס תוכנה פול-סטאק, עם דגש על זיהוי איומים, תפעול אבטחה, מערכות מאובטחות ופיתוח משחקים.'
        },
        'full-stack software engineer with hands on experience in game development and ethical hacking, building secure, production-ready solutions that solve real problems.': {
            zh: '全栈软件工程师，有游戏开发和道德黑客的实践经验，构建安全、可上线、解决真实问题的方案。',
            ja: 'ゲーム開発と倫理的ハッキングの実務経験を持つフルスタックエンジニア。安全で本番向けの、現実の問題を解く仕組みを作ります。',
            ko: '게임 개발과 윤리적 해킹 경험이 있는 풀스택 엔지니어. 안전하고 실서비스에 바로 쓰는, 실제 문제를 푸는 솔루션을 만듭니다.',
            ar: 'مهندس برمجيات متكامل بخبرة عملية في تطوير الألعاب والاختراق الأخلاقي، يبني حلولاً آمنة وجاهزة للإنتاج تعالج مشكلات حقيقية.',
            hi: 'गेम विकास और एथिकल हैकिंग का व्यावहारिक अनुभव रखने वाले फुल-स्टैक इंजीनियर, जो सुरक्षित और प्रोडक्शन-तैयार समाधान बनाते हैं।',
            ru: 'Фулстек-инженер с практикой в разработке игр и этичном хакинге. Делаю безопасные продакшен-решения реальных задач.',
            el: 'Μηχανικός full-stack με πρακτική εμπειρία σε παιχνίδια και ηθικό hacking, φτιάχνοντας ασφαλείς λύσεις έτοιμες για παραγωγή.',
            he: 'מהנדס פול-סטאק עם ניסיון מעשי בפיתוח משחקים והאקינג אתי, ובונה פתרונות מאובטחים ומוכנים לייצור.'
        },
        'with 5+ years of experience, i specialize in building secure, scalable saas platforms. i helped create keymint.dev, a developer-first licensing system serving enterprise users; working on secure api design, authentication, digital signatures, jwt, tls, and cryptographic license validation. my work emphasizes clean code, maintainability, and user experience. i also contributed to the development of puzzle scout & africa\'s legends a mobile game app when i was a game developer intern at leti arts ghana.': {
            zh: '五年以上经验，专注安全、可扩展的 SaaS 平台。我参与创建了面向企业和开发者的授权系统 Keymint.dev，负责安全 API、身份验证、数字签名、JWT、TLS 和许可证的密码学校验。工作强调清晰代码、可维护性和用户体验。在加纳 Leti Arts 实习期间，我也参与了移动游戏 Puzzle Scout 和 Africa’s Legends。',
            ja: '5年以上の経験で、安全で拡張しやすいSaaSを専門にしています。開発者と企業向けのライセンス基盤 Keymint.dev の立ち上げに関わり、安全なAPI、認証、デジタル署名、JWT、TLS、暗号によるライセンス検証を担当しました。コードの明快さ、保守性、体験を大切にしています。ガーナの Leti Arts でインターンとして、モバイルゲーム Puzzle Scout と Africa’s Legends にも参加しました。',
            ko: '5년 이상의 경험으로 안전하고 확장 가능한 SaaS를 만듭니다. 개발자와 기업을 위한 라이선스 시스템 Keymint.dev를 함께 만들었고, 보안 API, 인증, 전자서명, JWT, TLS, 암호 기반 라이선스 검증을 맡았습니다. 깨끗한 코드, 유지보수, 사용자 경험을 중시합니다. 가나 Leti Arts 인턴으로 모바일 게임 Puzzle Scout와 Africa’s Legends에도 참여했습니다.',
            ar: 'بخبرة تزيد على خمس سنوات، أتخصص في منصات SaaS آمنة وقابلة للتوسع. ساعدت في إنشاء Keymint.dev، نظام تراخيص للمطورين والمؤسسات، وعملت على واجهات آمنة والمصادقة والتوقيع الرقمي وJWT وTLS والتحقق التشفيري من التراخيص. أركّز على كود واضح وقابل للصيانة وتجربة مستخدم جيدة. وساهمت أيضًا في لعبتي Puzzle Scout وAfrica’s Legends أثناء تدريبي في Leti Arts بغانا.',
            hi: '5+ वर्षों के अनुभव में मैं सुरक्षित और स्केलेबल SaaS प्लेटफ़ॉर्म बनाता हूँ। Keymint.dev, डेवलपर-प्रथम लाइसेंसिंग सिस्टम, में सुरक्षित API, प्रमाणीकरण, डिजिटल हस्ताक्षर, JWT, TLS और क्रिप्टोग्राफ़िक लाइसेंस जाँच पर काम किया। साफ़ कोड, रखरखाव और उपयोगकर्ता अनुभव ज़रूरी हैं। घाना की Leti Arts में इंटर्न के रूप में Puzzle Scout और Africa’s Legends मोबाइल गेम में भी योगदान दिया।',
            ru: 'Более пяти лет я делаю безопасные и масштабируемые SaaS-платформы. Помог создать Keymint.dev — лицензирование для разработчиков и компаний: безопасные API, аутентификация, цифровые подписи, JWT, TLS и криптографическая проверка лицензий. Важны чистый код, поддержка и опыт пользователя. На стажировке в Leti Arts в Гане участвовал в мобильных играх Puzzle Scout и Africa’s Legends.',
            el: 'Με πάνω από 5 χρόνια εμπειρίας φτιάχνω ασφαλείς, επεκτάσιμες πλατφόρμες SaaS. Βοήθησα στη δημιουργία του Keymint.dev, συστήματος αδειών για προγραμματιστές και εταιρείες, με ασφαλή API, αυθεντικοποίηση, ψηφιακές υπογραφές, JWT, TLS και κρυπτογραφική επαλήθευση αδειών. Δουλεύω με καθαρό κώδικα, συντηρησιμότητα και εμπειρία χρήστη. Ως ασκούμενος στη Leti Arts στην Γκάνα συνέβαλα και στα Puzzle Scout και Africa’s Legends.',
            he: 'עם יותר מחמש שנות ניסיון אני בונה פלטפורמות SaaS מאובטחות וניתנות להרחבה. עזרתי ליצור את Keymint.dev, מערכת רישוי למפתחים ולארגונים, ועבדתי על API מאובטח, אימות, חתימות דיגיטליות, JWT, TLS ואימות רישיון קריפטוגרפי. העבודה שמה דגש על קוד נקי, תחזוקה וחוויית משתמש. כמתמחה ב-Leti Arts בגאנה תרמתי גם למשחקים Puzzle Scout ו-Africa’s Legends.'
        },
        'with 5+ years of experience, i specialize in building secure, scalable saas platforms. i helped create keymint.dev, a developer-first licensing system serving enterprise users.': {
            zh: '五年以上经验，专注安全、可扩展的 SaaS。我参与创建了面向企业和开发者的授权系统 Keymint.dev。',
            ja: '5年以上、安全で拡張しやすいSaaSが専門です。開発者と企業向けのライセンス基盤 Keymint.dev の立ち上げに関わりました。',
            ko: '5년 이상, 안전하고 확장 가능한 SaaS가 전문입니다. 개발자와 기업을 위한 라이선스 시스템 Keymint.dev를 함께 만들었습니다.',
            ar: 'بخبرة تزيد على خمس سنوات، أتخصص في منصات SaaS آمنة وقابلة للتوسع. ساعدت في إنشاء Keymint.dev للمطورين والمؤسسات.',
            hi: '5+ वर्षों से सुरक्षित और स्केलेबल SaaS मेरी विशेषज्ञता है। डेवलपरों और कंपनियों के लिए Keymint.dev बनाने में मदद की।',
            ru: 'Более пяти лет делаю безопасные масштабируемые SaaS. Помог создать Keymint.dev — лицензии для разработчиков и компаний.',
            el: 'Με πάνω από 5 χρόνια φτιάχνω ασφαλείς, επεκτάσιμες πλατφόρμες SaaS. Βοήθησα στη δημιουργία του Keymint.dev για προγραμματιστές και εταιρείες.',
            he: 'עם יותר מחמש שנים אני מתמחה בפלטפורמות SaaS מאובטחות. עזרתי ליצור את Keymint.dev למפתחים ולארגונים.'
        },
        'i also contributed to the development of puzzle scout & africa\'s legends, a mobile game app when i was a game developer intern at leti arts ghana.': {
            zh: '在加纳 Leti Arts 任游戏开发实习生时，我也参与了移动游戏 Puzzle Scout 和 Africa’s Legends。',
            ja: 'ガーナの Leti Arts でゲーム開発のインターンをしていたとき、モバイルゲーム Puzzle Scout と Africa’s Legends にも参加しました。',
            ko: '가나 Leti Arts에서 게임 개발 인턴으로 있을 때 모바일 게임 Puzzle Scout와 Africa’s Legends에도 참여했습니다.',
            ar: 'ساهمت أيضًا في Puzzle Scout وAfrica’s Legends، لعبة جوّال، أثناء تدريبي كمطور ألعاب في Leti Arts بغانا.',
            hi: 'घाना की Leti Arts में गेम डेवलपर इंटर्न रहते हुए Puzzle Scout और Africa’s Legends मोबाइल गेम में भी योगदान दिया।',
            ru: 'На стажировке разработчиком игр в Leti Arts в Гане участвовал в мобильных играх Puzzle Scout и Africa’s Legends.',
            el: 'Ως ασκούμενος προγραμματιστής παιχνιδιών στη Leti Arts στην Γκάνα συνέβαλα και στα κινητά παιχνίδια Puzzle Scout και Africa’s Legends.',
            he: 'כמתמחה לפיתוח משחקים ב-Leti Arts בגאנה תרמתי גם למשחקי המובייל Puzzle Scout ו-Africa’s Legends.'
        },
        'my cybersecurity interests center on soc operations, threat detection, incident response, network security, cryptography, and pki. i work with tools and technologies such as splunk, microsoft sentinel, wireshark, linux, python, and openssl to investigate security events, analyze system activity, and strengthen defensive controls.': {
            zh: '我的网络安全兴趣集中在 SOC 运营、威胁检测、事件响应、网络安全、密码学和 PKI。我使用 Splunk、Microsoft Sentinel、Wireshark、Linux、Python 和 OpenSSL 调查安全事件、分析系统活动并加强防御控制。',
            ja: '関心はSOC運用、脅威検知、インシデント対応、ネットワークセキュリティ、暗号、PKIにあります。Splunk、Microsoft Sentinel、Wireshark、Linux、Python、OpenSSLで事象を調べ、システムの動きを分析し、防御を強めます。',
            ko: '관심 분야는 SOC 운영, 위협 탐지, 사고 대응, 네트워크 보안, 암호학, PKI입니다. Splunk, Microsoft Sentinel, Wireshark, Linux, Python, OpenSSL로 보안 이벤트를 조사하고 시스템 활동을 분석하며 방어를 강화합니다.',
            ar: 'تتركز اهتماماتي على عمليات مركز الأمن، وكشف التهديدات، والاستجابة للحوادث، وأمن الشبكات، والتشفير، وPKI. أستخدم Splunk وMicrosoft Sentinel وWireshark وLinux وPython وOpenSSL للتحقيق في الأحداث وتحليل النشاط وتعزيز الضوابط الدفاعية.',
            hi: 'मेरी रुचि SOC संचालन, खतरा पहचान, घटना प्रतिक्रिया, नेटवर्क सुरक्षा, क्रिप्टोग्राफ़ी और PKI में है। Splunk, Microsoft Sentinel, Wireshark, Linux, Python और OpenSSL से घटनाओं की जाँच, सिस्टम गतिविधि का विश्लेषण और रक्षा नियंत्रण मज़बूत करता हूँ।',
            ru: 'Меня интересуют операции SOC, обнаружение угроз, реагирование на инциденты, сетевая безопасность, криптография и PKI. С Splunk, Microsoft Sentinel, Wireshark, Linux, Python и OpenSSL я расследую события, анализирую активность и усиливаю защиту.',
            el: 'Τα ενδιαφέροντά μου είναι οι λειτουργίες SOC, η ανίχνευση απειλών, η απόκριση σε περιστατικά, η ασφάλεια δικτύου, η κρυπτογραφία και το PKI. Με Splunk, Microsoft Sentinel, Wireshark, Linux, Python και OpenSSL διερευνώ συμβάντα, αναλύω δραστηριότητα και ενισχύω την άμυνα.',
            he: 'התחומים שלי הם תפעול SOC, זיהוי איומים, תגובה לאירועים, אבטחת רשת, הצפנה ו-PKI. אני עובד עם Splunk, Microsoft Sentinel, Wireshark, Linux, Python ו-OpenSSL כדי לחקור אירועים, לנתח פעילות ולחזק בקרות הגנה.'
        },
        'every alert tells an interesting story. the challenge is knowing which ones matter.': {
            zh: '每条告警都在讲一个有趣的故事。难的是知道哪些真正重要。',
            ja: 'すべてのアラートは面白い物語を語る。難しいのは、どれが重要かを見極めること。',
            ko: '모든 경보는 흥미로운 이야기를 합니다. 어려운 점은 무엇이 중요한지 아는 것입니다.',
            ar: 'كل تنبيه يروي قصة مثيرة. التحدي هو معرفة أيها يهم.',
            hi: 'हर अलर्ट एक दिलचस्प कहानी कहता है। चुनौती यह है कि कौन-सी मायने रखती है।',
            ru: 'Каждое оповещение рассказывает историю. Сложно понять, какие из них важны.',
            el: 'Κάθε ειδοποίηση λέει μια ενδιαφέρουσα ιστορία. Η πρόκληση είναι να ξέρεις ποιες μετράνε.',
            he: 'כל התראה מספרת סיפור מעניין. האתגר הוא לדעת אילו באמת חשובות.'
        },
        'building software isn\'t just about writing code—it\'s about understanding problems deeply and crafting solutions that stand the test of time.': {
            zh: '做软件不只是写代码，而是深入理解问题，并做出经得起时间考验的方案。',
            ja: 'ソフトウェアづくりはコードを書くだけではない。問題を深く理解し、時を経ても残る解決を形にすることだ。',
            ko: '소프트웨어는 코드를 쓰는 일이 전부가 아닙니다. 문제를 깊이 이해하고, 오래 가는 해결을 만드는 일입니다.',
            ar: 'بناء البرمجيات ليس كتابة كود فحسب، بل فهم المشكلات بعمق وصنع حلول تصمد مع الزمن.',
            hi: 'सॉफ़्टवेयर बनाना सिर्फ़ कोड लिखना नहीं है। समस्याओं को गहराई से समझना और टिकाऊ समाधान गढ़ना है।',
            ru: 'Создавать программы — не только писать код. Это глубоко понимать задачи и делать решения, которые выдерживают время.',
            el: 'Το λογισμικό δεν είναι μόνο κώδικας. Είναι να καταλαβαίνεις βαθιά τα προβλήματα και να φτιάχνεις λύσεις που αντέχουν στον χρόνο.',
            he: 'בניית תוכנה אינה רק כתיבת קוד. זה להבין בעיות לעומק וליצור פתרונות שעומדים במבחן הזמן.'
        },
        'a collection of projects i have contributed to the development of, demonstrating hands-on experience across software development and game development.': {
            zh: '我参与开发的一组项目，体现软件开发和游戏开发的实践经验。',
            ja: 'ソフトウェアとゲームの開発に実践で関わったプロジェクトの集まりです。',
            ko: '소프트웨어와 게임 개발에 직접 참여한 프로젝트 모음입니다.',
            ar: 'مجموعة مشاريع ساهمت في تطويرها، وتُظهر خبرة عملية في البرمجيات والألعاب.',
            hi: 'उन प्रोजेक्ट्स का संग्रह जिनमें मैंने योगदान दिया, सॉफ़्टवेयर और गेम विकास का व्यावहारिक अनुभव।',
            ru: 'Проекты, в разработке которых я участвовал: практика в ПО и в играх.',
            el: 'Μια συλλογή έργων στα οποία συνέβαλα, με πρακτική εμπειρία σε λογισμικό και παιχνίδια.',
            he: 'אוסף פרויקטים שתרמתי לפיתוחם, עם ניסיון מעשי בתוכנה ובמשחקים.'
        },
        'messaging that keeps tone, slang, and dialect while translating between languages. write the way you think, and read replies in your own language.': {
            zh: '在不同语言之间翻译时保留语气、俚语和方言。用你思考的方式书写，用你自己的语言阅读回复。',
            ja: '言語をまたいで訳しても、口調やスラングや方言を残すメッセージ。考えたまま書いて、返事は自分の言語で読む。',
            ko: '언어를 옮겨도 말투, 속어, 방언을 지키는 메시지. 생각하는 대로 쓰고, 답장은 자기 언어로 읽습니다.',
            ar: 'مراسلة تحافظ على النبرة والعامية واللهجة أثناء الترجمة بين اللغات. اكتب كما تفكر، واقرأ الردود بلغتك.',
            hi: 'ऐसे संदेश जो भाषाओं के बीच अनुवाद में लहजा, स्लैंग और बोली बनाए रखते हैं। जैसे सोचो वैसे लिखो, जवाब अपनी भाषा में पढ़ो।',
            ru: 'Переписка, которая при переводе сохраняет тон, сленг и диалект. Пишите как думаете и читайте ответы на своём языке.',
            el: 'Μηνύματα που κρατούν τον τόνο, την αργκό και τη διάλεκτο στη μετάφραση. Γράψε όπως σκέφτεσαι και διάβασε τις απαντήσεις στη γλώσσα σου.',
            he: 'הודעות ששומרות על טון, סלנג ודיאלקט בתרגום בין שפות. כתבו כמו שאתם חושבים, וקראו תשובות בשפה שלכם.'
        },
        'developer-first licensing platform with cryptographic signature validation. supports offline/online modes, serving 100+ active users with enterprise-grade security.': {
            zh: '面向开发者的许可证平台，使用密码学签名验证。支持离线和在线模式，为 100 多名活跃用户提供企业级安全。',
            ja: '開発者向けのライセンス基盤。暗号署名で検証し、オフラインとオンラインに対応。100人以上の利用者に企業レベルの安全性を提供します。',
            ko: '개발자를 위한 라이선스 플랫폼. 암호 서명으로 검증하고 오프라인·온라인을 지원합니다. 100명 이상의 활성 사용자에게 엔터프라이즈급 보안을 제공합니다.',
            ar: 'منصة تراخيص للمطورين مع تحقق بالتوقيع التشفيري. تعمل دون اتصال وبالاتصال، وتخدم أكثر من 100 مستخدم نشط بأمان بمستوى المؤسسات.',
            hi: 'डेवलपर-प्रथम लाइसेंसिंग प्लेटफ़ॉर्म, क्रिप्टोग्राफ़िक हस्ताक्षर से जाँच। ऑफ़लाइन और ऑनलाइन, 100+ सक्रिय उपयोगकर्ताओं के लिए एंटरप्राइज़ सुरक्षा।',
            ru: 'Лицензирование для разработчиков с проверкой криптографической подписи. Офлайн и онлайн, более 100 активных пользователей и корпоративная безопасность.',
            el: 'Πλατφόρμα αδειών για προγραμματιστές με επαλήθευση κρυπτογραφικής υπογραφής. Εκτός σύνδεσης και online, για 100+ ενεργούς χρήστες με ασφάλεια επιπέδου επιχείρησης.',
            he: 'פלטפורמת רישוי למפתחים עם אימות חתימה קריפטוגרפית. עובדת לא מקוון ומקוון, ליותר מ-100 משתמשים פעילים עם אבטחה ארגונית.'
        },
        'secure, scalable licensing infrastructure for developers. features rest api, vendor dashboard, and real-time analytics.': {
            zh: '面向开发者的安全、可扩展许可证基础设施。包含 REST API、供应商控制台和实时分析。',
            ja: '開発者向けの安全で拡張しやすいライセンス基盤。REST API、ベンダー向けダッシュボード、リアルタイム分析があります。',
            ko: '개발자를 위한 안전하고 확장 가능한 라이선스 기반. REST API, 공급자 대시보드, 실시간 분석을 갖춥니다.',
            ar: 'بنية تراخيص آمنة وقابلة للتوسع للمطورين. تتضمن واجهة REST ولوحة للمورّدين وتحليلات فورية.',
            hi: 'डेवलपरों के लिए सुरक्षित, स्केलेबल लाइसेंसिंग ढाँचा। REST API, वेंडर डैशबोर्ड और रीयल-टाइम विश्लेषण।',
            ru: 'Безопасная масштабируемая лицензионная инфраструктура для разработчиков. REST API, панель поставщика и аналитика в реальном времени.',
            el: 'Ασφαλής, επεκτάσιμη υποδομή αδειών για προγραμματιστές. REST API, πίνακας προμηθευτή και αναλυτικά σε πραγματικό χρόνο.',
            he: 'תשתית רישוי מאובטחת וניתנת להרחבה למפתחים. כוללת REST API, לוח ספקים וניתוח בזמן אמת.'
        },
        'video game development studio focused on creating immersive experiences for players. specializes in mobile and pc platforms, with a portfolio of successful titles.': {
            zh: '专注为玩家打造沉浸体验的游戏工作室。擅长移动和 PC 平台，拥有多款成功作品。',
            ja: 'プレイヤーに没入体験をつくるゲームスタジオ。モバイルとPCを得意とし、成功したタイトルを持っています。',
            ko: '플레이어에게 몰입 경험을 만드는 게임 스튜디오. 모바일과 PC에 강점이 있고, 성공한 작품들이 있습니다.',
            ar: 'استوديو ألعاب يركّز على تجارب غامرة للاعبين. يتخصص في الجوال والحاسوب، وله أعمال ناجحة.',
            hi: 'खिलाड़ियों के लिए डूबा देने वाले अनुभव बनाने वाला गेम स्टूडियो। मोबाइल और PC पर विशेषज्ञ, सफल खेलों का पोर्टफोलियो।',
            ru: 'Студия, которая делает погружающие игры. Специализация — мобильные и PC, в портфеле успешные проекты.',
            el: 'Στούντιο που φτιάχνει καθηλωτικές εμπειρίες για παίκτες. Ειδικεύεται σε κινητά και PC, με επιτυχημένους τίτλους.',
            he: 'סטודיו למשחקים שמתמקד בחוויות סוחפות. מתמחה במובייל ובמחשב, עם כותרים מוצלחים.'
        },
        'video game development studio focused on creating immersive experiences for playersspecializes in mobile and pc platforms, with a portfolio of successful titles.': {
            zh: '专注为玩家打造沉浸体验的游戏工作室。擅长移动和 PC 平台，拥有多款成功作品。',
            ja: 'プレイヤーに没入体験をつくるゲームスタジオ。モバイルとPCを得意とし、成功したタイトルを持っています。',
            ko: '플레이어에게 몰입 경험을 만드는 게임 스튜디오. 모바일과 PC에 강점이 있고, 성공한 작품들이 있습니다.',
            ar: 'استوديو ألعاب يركّز على تجارب غامرة للاعبين. يتخصص في الجوال والحاسوب، وله أعمال ناجحة.',
            hi: 'खिलाड़ियों के लिए डूबा देने वाले अनुभव बनाने वाला गेम स्टूडियो। मोबाइल और PC पर विशेषज्ञ, सफल खेलों का पोर्टफोलियो।',
            ru: 'Студия, которая делает погружающие игры. Специализация — мобильные и PC, в портфеле успешные проекты.',
            el: 'Στούντιο που φτιάχνει καθηλωτικές εμπειρίες για παίκτες. Ειδικεύεται σε κινητά και PC, με επιτυχημένους τίτλους.',
            he: 'סטודיו למשחקים שמתמקד בחוויות סוחפות. מתמחה במובייל ובמחשב, עם כותרים מוצלחים.'
        },
        "i'm always open to discussing new projects, game developers, collaboration opportunities, or simply connecting with fellow developers and entrepreneurs. whether you have a product idea, need technical consulting, or want to explore working together, i'd love to hear from you.": {
            zh: '我一直愿意讨论新项目、游戏开发与合作，或只是和其他开发者、创业者认识。如果你有产品想法、需要技术咨询，或想一起工作，我很乐意听到你的消息。',
            ja: '新しいプロジェクト、ゲーム開発、協業、あるいは開発者や起業家とのつながりをいつでも歓迎します。プロダクトのアイデア、技術相談、一緒に働く話があれば、ぜひ連絡してください。',
            ko: '새 프로젝트, 게임 개발, 협업, 또는 다른 개발자·창업자와의 연결에 늘 열려 있습니다. 제품 아이디어, 기술 자문, 함께 일하는 이야기라면 연락 주세요.',
            ar: 'أنا منفتح دائمًا على مشاريع جديدة وتطوير الألعاب وفرص التعاون، أو مجرد التعارف مع مطورين ورواد أعمال. إن كانت لديك فكرة أو حاجة لاستشارة تقنية أو رغبة في العمل معًا، يسعدني أن أسمع منك.',
            hi: 'नए प्रोजेक्ट, गेम डेवलपमेंट और सहयोग के लिए, या दूसरे डेवलपरों और उद्यमियों से जुड़ने के लिए मैं हमेशा तैयार हूँ। उत्पाद का विचार हो, तकनीकी सलाह चाहिए, या साथ काम करना हो, तो लिखें।',
            ru: 'Всегда открыт к новым проектам, разработке игр и сотрудничеству, или просто к разговору с разработчиками и основателями. Идея продукта, техническая консультация или совместная работа — напишите.',
            el: 'Είμαι πάντα ανοιχτός σε νέα έργα, ανάπτυξη παιχνιδιών και συνεργασίες, ή απλώς σε μια γνωριμία με άλλους developers και επιχειρηματίες. Ιδέα προϊόντος, τεχνική συμβουλή ή διάθεση να δουλέψουμε μαζί: γράψε μου.',
            he: 'אני תמיד פתוח לפרויקטים חדשים, לפיתוח משחקים ולשיתופי פעולה, או סתם לחיבור עם מפתחים ויזמים. רעיון למוצר, ייעוץ טכני, או רצון לעבוד יחד — אשמח לשמוע.'
        },
        "open to new projects and collaborations. whether you have a product idea or need technical consulting, i'd love to hear from you.": {
            zh: '欢迎新项目与合作。无论你有产品想法还是需要技术咨询，我都乐意听取。',
            ja: '新しいプロジェクトや協業を歓迎します。プロダクトのアイデアでも技術相談でも、ぜひ連絡を。',
            ko: '새 프로젝트와 협업에 열려 있습니다. 제품 아이디어나 기술 자문이 필요하면 연락 주세요.',
            ar: 'منفتح على مشاريع وتعاون جديد. سواء كانت لديك فكرة منتج أو حاجة لاستشارة تقنية، يسعدني أن أسمع منك.',
            hi: 'नए प्रोजेक्ट और सहयोग के लिए तैयार। उत्पाद का विचार हो या तकनीकी सलाह चाहिए, लिखें।',
            ru: 'Открыт к новым проектам и сотрудничеству. Идея продукта или техническая консультация — напишите.',
            el: 'Ανοιχτός σε νέα έργα και συνεργασίες. Ιδέα προϊόντος ή τεχνική συμβουλή: γράψε μου.',
            he: 'פתוח לפרויקטים חדשים ולשיתופי פעולה. רעיון למוצר או ייעוץ טכני — אשמח לשמוע.'
        }
    };

    const SELECTOR = [
        '.hero-subtitle',
        '.meta-label',
        '.meta-value',
        '.section-eyebrow',
        '.section-title',
        '.section-description',
        '.about-intro',
        '.about-text > p',
        '.pullquote p',
        '.skills > h3',
        '.skill-card h4',
        '.project-label',
        '.project-subtitle',
        '.project-description',
        '.contact-intro',
        '.scroll-indicator > span'
    ].join(',');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer = null;
    let started = false;
    let batch = [];
    let batchTimer = null;

    function normalize(value) {
        return value
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase()
            .replace(/^[“"']+|[”"']+$/g, '');
    }

    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function readingOrder(elements) {
        return elements
            .map((el) => ({ el, rect: el.getBoundingClientRect() }))
            .sort((a, b) => {
                const topDiff = a.rect.top - b.rect.top;
                if (Math.abs(topDiff) > 8) return topDiff;
                return a.rect.left - b.rect.left;
            })
            .map((item) => item.el);
    }

    function phrasePack(key) {
        const base = PHRASES[key];
        if (!base) return null;
        return Object.assign({}, base, EXTRA[key] || {});
    }

    function languagesForLine(index, total) {
        if (total <= 1) return LANGS.slice(0, 1);
        const span = LANGS.length - 1;
        const count = 1 + Math.round((index / (total - 1)) * span);
        return LANGS.slice(0, count);
    }

    function wipe(el) {
        el.classList.remove('is-wiping');
        void el.offsetWidth;
        el.classList.add('is-wiping');
    }

    async function cycle(el, pack, sequence) {
        const englishHTML = el.innerHTML;
        const lockedHeight = el.getBoundingClientRect().height;
        el.classList.add('lang-cycle');
        el.style.minHeight = lockedHeight + 'px';
        el.setAttribute('aria-busy', 'true');

        for (const code of sequence) {
            if (!pack[code]) continue;
            el.lang = code;
            el.dir = RTL.has(code) ? 'rtl' : 'ltr';
            el.textContent = pack[code];
            wipe(el);
            await wait(HOLD);
        }

        el.lang = 'en';
        el.dir = 'ltr';
        el.innerHTML = englishHTML;
        wipe(el);
        await wait(HOLD);
        el.style.minHeight = '';
        el.classList.remove('is-wiping');
        el.removeAttribute('aria-busy');
    }

    function runWave(elements) {
        const ordered = readingOrder(elements).filter((el) => {
            return phrasePack(normalize(el.textContent || '')) && el.dataset.langDone !== '1';
        });
        ordered.forEach((el, index) => {
            const pack = phrasePack(normalize(el.textContent || ''));
            el.dataset.langDone = '1';
            const sequence = languagesForLine(index, ordered.length);
            setTimeout(() => cycle(el, pack, sequence), index * STAGGER);
        });
    }

    function scan() {
        if (reducedMotion) return;
        if (observer) observer.disconnect();

        const pending = [...document.querySelectorAll(SELECTOR)].filter((el) => {
            if (el.dataset.langDone === '1') return false;
            if (!el.textContent || !el.textContent.trim()) return false;
            if (!el.getClientRects().length) return false;
            return Boolean(phrasePack(normalize(el.textContent)));
        });

        if (!pending.length) return;

        observer = new IntersectionObserver((entries) => {
            const entered = entries
                .filter((entry) => entry.isIntersecting)
                .map((entry) => entry.target);
            entered.forEach((el) => observer.unobserve(el));
            batch.push(...entered);
            clearTimeout(batchTimer);
            batchTimer = setTimeout(() => {
                const queued = batch;
                batch = [];
                runWave(queued);
            }, 60);
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.35 });

        pending.forEach((el) => observer.observe(el));
    }

    function begin() {
        if (started || reducedMotion) return;
        started = true;
        scan();
    }

    window.addEventListener('contentLoaded', begin);
    window.addEventListener('DOMContentLoaded', () => setTimeout(begin, 1200));
    if (document.readyState !== 'loading') setTimeout(begin, 1200);
})();
