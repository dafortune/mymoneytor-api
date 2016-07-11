--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: expense_pictures; Type: TABLE; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE TABLE expense_pictures (
    type character varying(100)[],
    file_id character varying(500),
    expense_id integer,
    id integer NOT NULL
);


ALTER TABLE expense_pictures OWNER TO mymoneytor;

--
-- Name: expense_pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: mymoneytor
--

CREATE SEQUENCE expense_pictures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE expense_pictures_id_seq OWNER TO mymoneytor;

--
-- Name: expense_pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mymoneytor
--

ALTER SEQUENCE expense_pictures_id_seq OWNED BY expense_pictures.id;


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE TABLE expenses (
    tags character varying[],
    id integer NOT NULL,
    name character varying(500),
    project_id integer
);


ALTER TABLE expenses OWNER TO mymoneytor;

--
-- Name: expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: mymoneytor
--

CREATE SEQUENCE expenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE expenses_id_seq OWNER TO mymoneytor;

--
-- Name: expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mymoneytor
--

ALTER SEQUENCE expenses_id_seq OWNED BY expenses.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE TABLE projects (
    name character varying(500),
    id integer NOT NULL
);


ALTER TABLE projects OWNER TO mymoneytor;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: mymoneytor
--

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE projects_id_seq OWNER TO mymoneytor;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mymoneytor
--

ALTER SEQUENCE projects_id_seq OWNED BY projects.id;


--
-- Name: user_projects; Type: TABLE; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE TABLE user_projects (
    user_id integer NOT NULL,
    project_id integer NOT NULL
);


ALTER TABLE user_projects OWNER TO mymoneytor;

--
-- Name: users; Type: TABLE; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE TABLE users (
    login_id character varying(250),
    email character varying(500),
    id integer NOT NULL
);


ALTER TABLE users OWNER TO mymoneytor;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: mymoneytor
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO mymoneytor;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mymoneytor
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY expense_pictures ALTER COLUMN id SET DEFAULT nextval('expense_pictures_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY expenses ALTER COLUMN id SET DEFAULT nextval('expenses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY projects ALTER COLUMN id SET DEFAULT nextval('projects_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: pk_expense_pictures_id; Type: CONSTRAINT; Schema: public; Owner: mymoneytor; Tablespace: 
--

ALTER TABLE ONLY expense_pictures
    ADD CONSTRAINT pk_expense_pictures_id PRIMARY KEY (id);


--
-- Name: pk_expenses_id; Type: CONSTRAINT; Schema: public; Owner: mymoneytor; Tablespace: 
--

ALTER TABLE ONLY expenses
    ADD CONSTRAINT pk_expenses_id PRIMARY KEY (id);


--
-- Name: pk_projects_id; Type: CONSTRAINT; Schema: public; Owner: mymoneytor; Tablespace: 
--

ALTER TABLE ONLY projects
    ADD CONSTRAINT pk_projects_id PRIMARY KEY (id);


--
-- Name: pk_user_projects_user_id_project_id; Type: CONSTRAINT; Schema: public; Owner: mymoneytor; Tablespace: 
--

ALTER TABLE ONLY user_projects
    ADD CONSTRAINT pk_user_projects_user_id_project_id PRIMARY KEY (user_id, project_id);


--
-- Name: pk_users_id; Type: CONSTRAINT; Schema: public; Owner: mymoneytor; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users_id PRIMARY KEY (id);


--
-- Name: fki_expense_pictures_expense_id_expenses_id; Type: INDEX; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE INDEX fki_expense_pictures_expense_id_expenses_id ON expense_pictures USING btree (expense_id);


--
-- Name: fki_expenses_project_id_projects_id; Type: INDEX; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE INDEX fki_expenses_project_id_projects_id ON expenses USING btree (project_id);


--
-- Name: fki_user_projects_project_id_projects_id; Type: INDEX; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE INDEX fki_user_projects_project_id_projects_id ON user_projects USING btree (project_id);


--
-- Name: fki_user_projects_user_id_users_id; Type: INDEX; Schema: public; Owner: mymoneytor; Tablespace: 
--

CREATE INDEX fki_user_projects_user_id_users_id ON user_projects USING btree (user_id);


--
-- Name: fk_expense_pictures_expense_id_expenses_id; Type: FK CONSTRAINT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY expense_pictures
    ADD CONSTRAINT fk_expense_pictures_expense_id_expenses_id FOREIGN KEY (expense_id) REFERENCES expenses(id);


--
-- Name: fk_expenses_project_id_projects_id; Type: FK CONSTRAINT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY expenses
    ADD CONSTRAINT fk_expenses_project_id_projects_id FOREIGN KEY (project_id) REFERENCES projects(id);


--
-- Name: fk_user_projects_project_id_projects_id; Type: FK CONSTRAINT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY user_projects
    ADD CONSTRAINT fk_user_projects_project_id_projects_id FOREIGN KEY (project_id) REFERENCES projects(id);


--
-- Name: fk_user_projects_user_id_users_id; Type: FK CONSTRAINT; Schema: public; Owner: mymoneytor
--

ALTER TABLE ONLY user_projects
    ADD CONSTRAINT fk_user_projects_user_id_users_id FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

