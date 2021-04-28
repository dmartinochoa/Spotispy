--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-04-13 22:13:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 200 (class 1259 OID 16408)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    gender character varying(1) DEFAULT 'o'::character varying NOT NULL,
    birthday date,
    img character varying(200) DEFAULT 'https://i.imgur.com/UsbqJKV.jpg'::character varying NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16433)
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.accounts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 201 (class 1259 OID 16416)
-- Name: friends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friends (
    id integer NOT NULL,
    idfriend integer NOT NULL,
    idfriend2 integer NOT NULL
);


ALTER TABLE public.friends OWNER TO postgres;

--
-- TOC entry 2993 (class 0 OID 16408)
-- Dependencies: 200
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, username, password, email, gender, birthday, img) FROM stdin;
2	test	671f54ce0c540f78ffe1e26dcf9c2a047aea4fda	ty4yourspam@gmail.com	o	\N	https://i.imgur.com/UsbqJKV.jpg
\.


--
-- TOC entry 2994 (class 0 OID 16416)
-- Dependencies: 201
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friends (id, idfriend, idfriend2) FROM stdin;
\.


--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 202
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 2, true);


--
-- TOC entry 2858 (class 2606 OID 16420)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 2860 (class 2606 OID 16422)
-- Name: friends friends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (id);


--
-- TOC entry 2861 (class 2606 OID 16423)
-- Name: friends fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT fk1 FOREIGN KEY (idfriend) REFERENCES public.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2862 (class 2606 OID 16428)
-- Name: friends fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT fk2 FOREIGN KEY (idfriend2) REFERENCES public.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2021-04-13 22:13:46

--
-- PostgreSQL database dump complete
--

