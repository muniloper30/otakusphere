--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-06-02 10:04:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS otakusphere;
--
-- TOC entry 4966 (class 1262 OID 16388)
-- Name: otakusphere; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE otakusphere WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es-ES';


ALTER DATABASE otakusphere OWNER TO postgres;

\connect otakusphere

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16399)
-- Name: animes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.animes (
    id_anime integer NOT NULL,
    id_api integer NOT NULL,
    titulo character varying(255) NOT NULL,
    estado character varying(50),
    url_imagen text,
    puntuacion_api double precision
);


ALTER TABLE public.animes OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16398)
-- Name: animes_id_anime_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.animes_id_anime_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animes_id_anime_seq OWNER TO postgres;

--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 219
-- Name: animes_id_anime_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.animes_id_anime_seq OWNED BY public.animes.id_anime;


--
-- TOC entry 223 (class 1259 OID 16424)
-- Name: favoritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritos (
    id_usuario integer NOT NULL,
    id_anime integer NOT NULL
);


ALTER TABLE public.favoritos OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16463)
-- Name: lista_animes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lista_animes (
    id_lista_anime integer NOT NULL,
    id_lista integer,
    id_anime integer,
    comentario text,
    puntuacion integer,
    fecha_agregado timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT lista_animes_puntuacion_check CHECK (((puntuacion >= 1) AND (puntuacion <= 10)))
);


ALTER TABLE public.lista_animes OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16462)
-- Name: lista_animes_id_lista_anime_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lista_animes_id_lista_anime_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lista_animes_id_lista_anime_seq OWNER TO postgres;

--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 226
-- Name: lista_animes_id_lista_anime_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lista_animes_id_lista_anime_seq OWNED BY public.lista_animes.id_lista_anime;


--
-- TOC entry 222 (class 1259 OID 16410)
-- Name: listas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listas (
    id_lista integer NOT NULL,
    id_usuario integer,
    nombre_lista character varying(50),
    CONSTRAINT listas_nombre_lista_check CHECK (((nombre_lista)::text = ANY ((ARRAY['viendo'::character varying, 'pendiente'::character varying, 'completado'::character varying])::text[])))
);


ALTER TABLE public.listas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16409)
-- Name: listas_id_lista_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listas_id_lista_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.listas_id_lista_seq OWNER TO postgres;

--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 221
-- Name: listas_id_lista_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listas_id_lista_seq OWNED BY public.listas.id_lista;


--
-- TOC entry 225 (class 1259 OID 16440)
-- Name: reseñas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."reseñas" (
    "id_reseña" integer NOT NULL,
    id_usuario integer,
    id_anime integer,
    comentario text,
    puntuacion integer,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reseñas_puntuacion_check" CHECK (((puntuacion >= 1) AND (puntuacion <= 10)))
);


ALTER TABLE public."reseñas" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16439)
-- Name: reseñas_id_reseña_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."reseñas_id_reseña_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."reseñas_id_reseña_seq" OWNER TO postgres;

--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 224
-- Name: reseñas_id_reseña_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."reseñas_id_reseña_seq" OWNED BY public."reseñas"."id_reseña";


--
-- TOC entry 218 (class 1259 OID 16390)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16389)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4767 (class 2604 OID 16402)
-- Name: animes id_anime; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animes ALTER COLUMN id_anime SET DEFAULT nextval('public.animes_id_anime_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 16466)
-- Name: lista_animes id_lista_anime; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_animes ALTER COLUMN id_lista_anime SET DEFAULT nextval('public.lista_animes_id_lista_anime_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 16413)
-- Name: listas id_lista; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listas ALTER COLUMN id_lista SET DEFAULT nextval('public.listas_id_lista_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 16443)
-- Name: reseñas id_reseña; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseñas" ALTER COLUMN "id_reseña" SET DEFAULT nextval('public."reseñas_id_reseña_seq"'::regclass);


--
-- TOC entry 4766 (class 2604 OID 16393)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4953 (class 0 OID 16399)
-- Dependencies: 220
-- Data for Name: animes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.animes (id_anime, id_api, titulo, estado, url_imagen, puntuacion_api) FROM stdin;
1	101922	Kimetsu no Yaiba	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg	\N
2	113415	Jujutsu Kaisen	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg	\N
3	11061	HUNTER×HUNTER (2011)	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11061-y5gsT1hoHuHw.png	\N
5	1535	DEATH NOTE	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg	\N
7	5114	Hagane no Renkinjutsushi: FULLMETAL ALCHEMIST	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-nSWCgQlmOMtj.jpg	\N
8	20958	Shingeki no Kyojin Season 2	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20958-HuFJyr54Mmir.jpg	\N
9	21	ONE PIECE	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg	\N
10	21459	Boku no Hero Academia	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-nYh85uj2Fuwr.jpg	\N
11	16498	Shingeki no Kyojin	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg	\N
12	20	NARUTO	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-dE6UHbFFg1A5.jpg	\N
13	153288	Kaijuu 8-gou	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-25FBfFJzEQ5O.jpg	\N
14	178754	Kaijuu 8-gou 2nd Season	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx178754-OduDgtHsdFPD.jpg	\N
15	21222	Mankitsu Happening	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21222-GxhbPz7klIFw.png	\N
21	11757	Sword Art Online	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11757-SxYDUzdr9rh2.jpg	\N
24	21087	One Punch Man	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21087-B5DHjqZ3kW4b.jpg	\N
32	20613	Akame ga Kill!	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20613-HXHpec4bemk5.jpg	\N
35	108465	Mushoku Tensei: Isekai Ittara Honki Dasu	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx108465-1ANspF1EWyFx.jpg	\N
37	101981	Joshi Ochi!: 2-kai kara Onna no Ko ga... Futte kita!?	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101981-f4nDbUB9GWv3.png	\N
39	99423	Darling in the Franxx	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx99423-8MBxtwCeHf8B.png	\N
42	2001	Tengen Toppa Gurren Lagann	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx2001-XwRnjzGeFWRQ.png	\N
54	112151	Kimetsu no Yaiba: Mugen Ressha-hen	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx112151-1qlQwPB1RrJe.png	\N
55	21827	Violet Evergarden	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21827-ubzq619ZA2E9.png	\N
56	20789	Nanatsu no Taizai	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20789-Ma5ouSYPkru9.jpg	\N
57	20850	Tokyo Ghoul √A	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20850-glDf9EMKeCwe.jpg	\N
58	20665	Shigatsu wa Kimi no Uso	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20665-TLgkL8T8IRFd.png	\N
59	101281	Carole & Tuesday	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101281-s1UoXUaYXhxn.jpg	\N
60	100298	Megalo Box	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b100298-A5VQUcw7ZC64.jpg	\N
67	20605	Tokyo Ghoul	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b20605-k665mVkSug8D.jpg	\N
73	1735	NARUTO: Shippuuden	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1735-kGfVm0YqCPcu.png	\N
75	20464	Haikyuu!!	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-ooZUyBe4ptp9.png	\N
76	97940	Black Clover	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97940-fyh8o7gNbha0.png	\N
84	151807	Ore dake Level Up na Ken	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png	\N
85	176496	Ore dake Level Up na Ken: Season 2 - Arise from the Shadow	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx176496-9BDMjAZGEbq4.png	\N
86	184694	Ore dake Level Up na Ken: ReAwakening	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx184694-EmVoCuV4uAGv.png	\N
96	269	BLEACH	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx269-d2GmRkJbMopq.png	\N
97	199	Sen to Chihiro no Kamikakushi	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx199-sWefXJvXkDOb.jpg	\N
98	97668	One Punch Man 2	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97668-nC8gQrXVxt7k.png	\N
99	105310	Enen no Shouboutai	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx105310-2PKUvoaA6fTn.jpg	\N
101	142329	Kimetsu no Yaiba: Yuukaku-hen	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx142329-kET1PIXJv2eW.jpg	\N
102	104578	Shingeki no Kyojin Season 3 Part 2	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx104578-k61nx3LPjvgd.jpg	\N
116	14719	JoJo no Kimyou na Bouken (TV)	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx14719-VT5dRzTBSZ0w.jpg	\N
117	1	Cowboy Bebop	\N	https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1-GCsPm7waJ4kS.png	\N
\.


--
-- TOC entry 4956 (class 0 OID 16424)
-- Dependencies: 223
-- Data for Name: favoritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoritos (id_usuario, id_anime) FROM stdin;
18	11
18	2
18	10
18	8
20	7
20	9
20	8
20	73
22	84
22	85
22	86
23	99
23	101
23	102
23	1
24	11
24	1
24	2
24	7
24	9
\.


--
-- TOC entry 4960 (class 0 OID 16463)
-- Dependencies: 227
-- Data for Name: lista_animes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lista_animes (id_lista_anime, id_lista, id_anime, comentario, puntuacion, fecha_agregado) FROM stdin;
30	6	10	\N	\N	2025-05-22 17:12:44.860891
32	6	8	\N	\N	2025-05-22 17:12:58.988552
33	6	3	\N	\N	2025-05-22 17:13:00.270001
37	6	11	\N	\N	2025-05-23 10:23:06.203944
39	6	1	\N	\N	2025-05-23 10:27:03.557167
45	6	9	\N	\N	2025-05-23 13:51:41.6562
51	6	42	\N	\N	2025-05-23 15:02:35.027739
52	5	11	\N	\N	2025-05-23 15:25:00.194983
57	4	54	\N	\N	2025-05-26 13:40:21.596377
58	4	55	\N	\N	2025-05-26 13:40:24.161184
59	4	56	\N	\N	2025-05-26 13:40:25.607075
60	4	57	\N	\N	2025-05-26 13:40:31.152034
61	4	24	\N	\N	2025-05-26 13:41:08.917349
62	5	58	\N	\N	2025-06-02 08:58:33.814634
63	5	59	\N	\N	2025-06-02 08:58:39.48164
64	5	60	\N	\N	2025-06-02 08:58:55.589509
65	7	11	\N	\N	2025-06-02 08:59:44.907356
66	8	1	\N	\N	2025-06-02 08:59:47.59017
67	8	5	\N	\N	2025-06-02 08:59:49.316331
68	7	2	\N	\N	2025-06-02 08:59:50.729454
69	7	10	\N	\N	2025-06-02 08:59:53.433686
70	9	3	\N	\N	2025-06-02 08:59:55.792773
71	7	67	\N	\N	2025-06-02 09:00:00.728997
72	7	7	\N	\N	2025-06-02 09:00:02.345285
73	7	8	\N	\N	2025-06-02 09:00:15.763767
74	7	73	\N	\N	2025-06-02 09:00:25.361376
75	9	75	\N	\N	2025-06-02 09:00:28.440406
76	8	76	\N	\N	2025-06-02 09:00:31.212014
77	8	56	\N	\N	2025-06-02 09:00:41.199852
78	7	54	\N	\N	2025-06-02 09:00:46.269496
79	10	11	\N	\N	2025-06-02 09:30:49.28332
80	11	1	\N	\N	2025-06-02 09:30:51.521656
81	10	5	\N	\N	2025-06-02 09:30:53.144934
82	10	2	\N	\N	2025-06-02 09:30:54.394357
83	10	9	\N	\N	2025-06-02 09:30:57.386147
84	12	11	\N	\N	2025-06-02 09:32:39.393431
85	12	1	\N	\N	2025-06-02 09:32:40.613422
86	13	5	\N	\N	2025-06-02 09:32:44.54434
87	12	2	\N	\N	2025-06-02 09:32:46.150602
88	12	24	\N	\N	2025-06-02 09:32:51.827264
89	13	67	\N	\N	2025-06-02 09:32:54.041004
90	13	9	\N	\N	2025-06-02 09:32:55.826652
91	14	10	\N	\N	2025-06-02 09:32:58.522121
92	13	21	\N	\N	2025-06-02 09:33:02.064851
93	13	96	\N	\N	2025-06-02 09:33:07.720627
94	12	97	\N	\N	2025-06-02 09:33:11.604716
95	14	98	\N	\N	2025-06-02 09:33:15.091268
96	14	99	\N	\N	2025-06-02 09:33:16.67835
97	15	2	\N	\N	2025-06-02 09:49:50.182178
98	15	1	\N	\N	2025-06-02 09:49:51.801041
99	16	11	\N	\N	2025-06-02 09:49:55.377695
100	16	10	\N	\N	2025-06-02 09:49:57.001296
101	16	3	\N	\N	2025-06-02 09:49:59.645334
102	16	7	\N	\N	2025-06-02 09:50:03.690162
103	15	9	\N	\N	2025-06-02 09:50:09.281103
104	17	116	\N	\N	2025-06-02 09:50:45.62202
105	17	117	\N	\N	2025-06-02 09:50:50.966557
\.


--
-- TOC entry 4955 (class 0 OID 16410)
-- Dependencies: 222
-- Data for Name: listas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listas (id_lista, id_usuario, nombre_lista) FROM stdin;
4	18	viendo
5	18	pendiente
6	18	completado
7	20	completado
8	20	pendiente
9	20	viendo
10	22	pendiente
11	22	viendo
12	23	completado
13	23	pendiente
14	23	viendo
15	24	viendo
16	24	completado
17	24	pendiente
\.


--
-- TOC entry 4958 (class 0 OID 16440)
-- Dependencies: 225
-- Data for Name: reseñas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."reseñas" ("id_reseña", id_usuario, id_anime, comentario, puntuacion, fecha) FROM stdin;
\.


--
-- TOC entry 4951 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre, email, password) FROM stdin;
17	Muniki	muni@example.com	$2b$10$0mptqkvriofR1dCMz0N7KOZmWMoW.VwkhQhdLTBwPlIVx.VSBA4g2
18	Victor	victor@example.com	$2b$10$o95xyUIJau6EDO3Vvw675OXloGOM8I.aDLRbcry0kLf/9uQei6lke
20	patricia	patricia@example.com	$2b$10$wKxSfnGqG8eGzvYcYAKS1uHnB6eI86z3DvrLyOSmUVSiAuxyfXpbO
21	Jorge	jorge@example.com	$2b$10$FZO0R9dSgd2bKbgiVvySM.U.Do3G9anpqutW9PauqPfptUK43YSDW
22	Jesus	jesus@example.com	$2b$10$IXhO0QMRwDvIi2Ta9cbnf.3I.XqRwCwNLhpcDzdMKnv5JQ/Aw22EC
23	Frani	fran@example.com	$2b$10$72WMKWX2YkiTnyJ5XAT/R.5X06wClegWv2.NPHLPL3rLApVFFuJj2
24	Eduard	eduard@example.com	$2b$10$1hCX4rEjazqKw4roz/LSt.SEw8yLwVQFa6NR.rLH2a2DHBlpvbSUW
25	Luffy	luffy@example.com	$2b$10$oSfaR27MW0H0v3x1djpJt.cO2zGJ9n1sMcn.Nhg.FsMPHuZp9fXru
26	Zoro	zoro@example.com	$2b$10$6hrQYi/.bYKbMei7pwso9OaFQhXzDfYYn93OYCIMU8puiLvT6xDsO
\.


--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 219
-- Name: animes_id_anime_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animes_id_anime_seq', 117, true);


--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 226
-- Name: lista_animes_id_lista_anime_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lista_animes_id_lista_anime_seq', 105, true);


--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 221
-- Name: listas_id_lista_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listas_id_lista_seq', 17, true);


--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 224
-- Name: reseñas_id_reseña_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."reseñas_id_reseña_seq"', 1, false);


--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 26, true);


--
-- TOC entry 4781 (class 2606 OID 16408)
-- Name: animes animes_id_api_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animes
    ADD CONSTRAINT animes_id_api_key UNIQUE (id_api);


--
-- TOC entry 4783 (class 2606 OID 16406)
-- Name: animes animes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animes
    ADD CONSTRAINT animes_pkey PRIMARY KEY (id_anime);


--
-- TOC entry 4789 (class 2606 OID 16428)
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id_usuario, id_anime);


--
-- TOC entry 4795 (class 2606 OID 16474)
-- Name: lista_animes lista_animes_id_lista_id_anime_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_animes
    ADD CONSTRAINT lista_animes_id_lista_id_anime_key UNIQUE (id_lista, id_anime);


--
-- TOC entry 4797 (class 2606 OID 16472)
-- Name: lista_animes lista_animes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_animes
    ADD CONSTRAINT lista_animes_pkey PRIMARY KEY (id_lista_anime);


--
-- TOC entry 4785 (class 2606 OID 16418)
-- Name: listas listas_id_usuario_nombre_lista_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listas
    ADD CONSTRAINT listas_id_usuario_nombre_lista_key UNIQUE (id_usuario, nombre_lista);


--
-- TOC entry 4787 (class 2606 OID 16416)
-- Name: listas listas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listas
    ADD CONSTRAINT listas_pkey PRIMARY KEY (id_lista);


--
-- TOC entry 4791 (class 2606 OID 16451)
-- Name: reseñas reseñas_id_usuario_id_anime_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseñas"
    ADD CONSTRAINT "reseñas_id_usuario_id_anime_key" UNIQUE (id_usuario, id_anime);


--
-- TOC entry 4793 (class 2606 OID 16449)
-- Name: reseñas reseñas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseñas"
    ADD CONSTRAINT "reseñas_pkey" PRIMARY KEY ("id_reseña");


--
-- TOC entry 4777 (class 2606 OID 16397)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4779 (class 2606 OID 16395)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4799 (class 2606 OID 16434)
-- Name: favoritos favoritos_id_anime_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_anime_fkey FOREIGN KEY (id_anime) REFERENCES public.animes(id_anime) ON DELETE CASCADE;


--
-- TOC entry 4800 (class 2606 OID 16429)
-- Name: favoritos favoritos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4803 (class 2606 OID 16480)
-- Name: lista_animes lista_animes_id_anime_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_animes
    ADD CONSTRAINT lista_animes_id_anime_fkey FOREIGN KEY (id_anime) REFERENCES public.animes(id_anime) ON DELETE CASCADE;


--
-- TOC entry 4804 (class 2606 OID 16475)
-- Name: lista_animes lista_animes_id_lista_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_animes
    ADD CONSTRAINT lista_animes_id_lista_fkey FOREIGN KEY (id_lista) REFERENCES public.listas(id_lista) ON DELETE CASCADE;


--
-- TOC entry 4798 (class 2606 OID 16419)
-- Name: listas listas_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listas
    ADD CONSTRAINT listas_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4801 (class 2606 OID 16457)
-- Name: reseñas reseñas_id_anime_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseñas"
    ADD CONSTRAINT "reseñas_id_anime_fkey" FOREIGN KEY (id_anime) REFERENCES public.animes(id_anime) ON DELETE CASCADE;


--
-- TOC entry 4802 (class 2606 OID 16452)
-- Name: reseñas reseñas_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reseñas"
    ADD CONSTRAINT "reseñas_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


-- Completed on 2025-06-02 10:04:48

--
-- PostgreSQL database dump complete
--

