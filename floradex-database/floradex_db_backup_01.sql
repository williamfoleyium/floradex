PGDMP      0                }           floradex    17.4    17.2 _    ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            >           1262    16618    floradex    DATABASE     n   CREATE DATABASE floradex WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE floradex;
                     postgres    false            �            1259    16647    care_details_table    TABLE       CREATE TABLE public.care_details_table (
    id integer NOT NULL,
    plant_id integer,
    water_frequency_winter character varying(100),
    water_frequency_summer character varying(100),
    sun_requirements character varying(100),
    min_temp numeric(5,2),
    fertilizer_winter character varying(100),
    fertilizer_summer character varying(100),
    soil_type character varying(100),
    soil_ph numeric(4,2),
    humidity numeric(5,2),
    degree_days integer,
    lifecycle character varying(50),
    elevation numeric(6,2)
);
 &   DROP TABLE public.care_details_table;
       public         heap r       postgres    false            �            1259    16646    care_details_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.care_details_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.care_details_table_id_seq;
       public               postgres    false    222            ?           0    0    care_details_table_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.care_details_table_id_seq OWNED BY public.care_details_table.id;
          public               postgres    false    221            �            1259    16749    companion_planting_table    TABLE     �  CREATE TABLE public.companion_planting_table (
    id integer NOT NULL,
    plant_id integer,
    companion_plant_id integer,
    relationship_type character varying(50),
    CONSTRAINT companion_planting_table_relationship_type_check CHECK (((relationship_type)::text = ANY ((ARRAY['beneficial'::character varying, 'harmful'::character varying, 'neutral'::character varying])::text[])))
);
 ,   DROP TABLE public.companion_planting_table;
       public         heap r       postgres    false            �            1259    16748    companion_planting_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.companion_planting_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.companion_planting_table_id_seq;
       public               postgres    false    236            @           0    0    companion_planting_table_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.companion_planting_table_id_seq OWNED BY public.companion_planting_table.id;
          public               postgres    false    235            �            1259    16734    description_table    TABLE     �   CREATE TABLE public.description_table (
    id integer NOT NULL,
    plant_id integer,
    origin character varying(255),
    general_description text,
    fruit_description text,
    history text,
    use text,
    toxicity boolean DEFAULT false
);
 %   DROP TABLE public.description_table;
       public         heap r       postgres    false            �            1259    16733    description_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.description_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.description_table_id_seq;
       public               postgres    false    234            A           0    0    description_table_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.description_table_id_seq OWNED BY public.description_table.id;
          public               postgres    false    233            �            1259    16695    flower_table    TABLE     �   CREATE TABLE public.flower_table (
    id integer NOT NULL,
    plant_id integer,
    type character varying(100),
    color character varying(50),
    edible boolean DEFAULT false,
    taste character varying(100),
    nutrients text,
    uses text
);
     DROP TABLE public.flower_table;
       public         heap r       postgres    false            �            1259    16694    flower_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.flower_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.flower_table_id_seq;
       public               postgres    false    228            B           0    0    flower_table_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.flower_table_id_seq OWNED BY public.flower_table.id;
          public               postgres    false    227            �            1259    16680    fruit_table    TABLE     "  CREATE TABLE public.fruit_table (
    id integer NOT NULL,
    plant_id integer,
    type character varying(100),
    color character varying(50),
    edible boolean DEFAULT false,
    taste character varying(100),
    nutrients text,
    uses text,
    seed_type character varying(100)
);
    DROP TABLE public.fruit_table;
       public         heap r       postgres    false            �            1259    16679    fruit_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fruit_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.fruit_table_id_seq;
       public               postgres    false    226            C           0    0    fruit_table_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.fruit_table_id_seq OWNED BY public.fruit_table.id;
          public               postgres    false    225            �            1259    16661    hardiness_table    TABLE     s  CREATE TABLE public.hardiness_table (
    id integer NOT NULL,
    plant_id integer,
    drought_resistance integer,
    heat_resistance integer,
    cold_resistance integer,
    flood_resistance integer,
    pest_resistance integer,
    light_sensitivity integer,
    nutrient_sensitivity integer,
    CONSTRAINT hardiness_table_cold_resistance_check CHECK (((cold_resistance >= 1) AND (cold_resistance <= 10))),
    CONSTRAINT hardiness_table_drought_resistance_check CHECK (((drought_resistance >= 1) AND (drought_resistance <= 10))),
    CONSTRAINT hardiness_table_flood_resistance_check CHECK (((flood_resistance >= 1) AND (flood_resistance <= 10))),
    CONSTRAINT hardiness_table_heat_resistance_check CHECK (((heat_resistance >= 1) AND (heat_resistance <= 10))),
    CONSTRAINT hardiness_table_light_sensitivity_check CHECK (((light_sensitivity >= 1) AND (light_sensitivity <= 10))),
    CONSTRAINT hardiness_table_nutrient_sensitivity_check CHECK (((nutrient_sensitivity >= 1) AND (nutrient_sensitivity <= 10))),
    CONSTRAINT hardiness_table_pest_resistance_check CHECK (((pest_resistance >= 1) AND (pest_resistance <= 10)))
);
 #   DROP TABLE public.hardiness_table;
       public         heap r       postgres    false            �            1259    16660    hardiness_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hardiness_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.hardiness_table_id_seq;
       public               postgres    false    224            D           0    0    hardiness_table_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.hardiness_table_id_seq OWNED BY public.hardiness_table.id;
          public               postgres    false    223            �            1259    16620    plant_families    TABLE     �   CREATE TABLE public.plant_families (
    id integer NOT NULL,
    family_name character varying(255) NOT NULL,
    description text
);
 "   DROP TABLE public.plant_families;
       public         heap r       postgres    false            �            1259    16619    plant_families_id_seq    SEQUENCE     �   CREATE SEQUENCE public.plant_families_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.plant_families_id_seq;
       public               postgres    false    218            E           0    0    plant_families_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.plant_families_id_seq OWNED BY public.plant_families.id;
          public               postgres    false    217            �            1259    16724    plant_health_issues    TABLE     9  CREATE TABLE public.plant_health_issues (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(100),
    life_cycle_time character varying(100),
    plant_target character varying(255),
    attack_description text,
    prevention text,
    treatment text,
    category character varying(50),
    CONSTRAINT plant_health_issues_category_check CHECK (((category)::text = ANY ((ARRAY['insect'::character varying, 'disease'::character varying, 'wildlife'::character varying, 'nutrient_deficiency'::character varying])::text[])))
);
 '   DROP TABLE public.plant_health_issues;
       public         heap r       postgres    false            �            1259    16723    plant_health_issues_id_seq    SEQUENCE     �   CREATE SEQUENCE public.plant_health_issues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.plant_health_issues_id_seq;
       public               postgres    false    232            F           0    0    plant_health_issues_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.plant_health_issues_id_seq OWNED BY public.plant_health_issues.id;
          public               postgres    false    231            �            1259    16767    plant_images_table    TABLE     �   CREATE TABLE public.plant_images_table (
    id integer NOT NULL,
    plant_id integer,
    image_url text NOT NULL,
    image_type character varying(50),
    is_primary boolean DEFAULT false
);
 &   DROP TABLE public.plant_images_table;
       public         heap r       postgres    false            �            1259    16766    plant_images_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.plant_images_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.plant_images_table_id_seq;
       public               postgres    false    238            G           0    0    plant_images_table_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.plant_images_table_id_seq OWNED BY public.plant_images_table.id;
          public               postgres    false    237            �            1259    16710    plant_structure_table    TABLE     G  CREATE TABLE public.plant_structure_table (
    id integer NOT NULL,
    plant_id integer,
    plant_spacing numeric(5,2),
    seed_depth numeric(4,2),
    seed_germination_temp numeric(5,2),
    seed_germination_time integer,
    days_to_maturity integer,
    pruning text,
    height numeric(6,2),
    spread numeric(6,2)
);
 )   DROP TABLE public.plant_structure_table;
       public         heap r       postgres    false            �            1259    16709    plant_structure_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.plant_structure_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.plant_structure_table_id_seq;
       public               postgres    false    230            H           0    0    plant_structure_table_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.plant_structure_table_id_seq OWNED BY public.plant_structure_table.id;
          public               postgres    false    229            �            1259    16629    plant_table    TABLE       CREATE TABLE public.plant_table (
    id integer NOT NULL,
    family_id integer,
    plant_name character varying(255) NOT NULL,
    variety_name character varying(255),
    scientific_name character varying(255) NOT NULL,
    plant_type character varying(100) NOT NULL,
    environmental_type character varying(100),
    yield_type character varying(100),
    flower_type character varying(100),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.plant_table;
       public         heap r       postgres    false            �            1259    16628    plant_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.plant_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.plant_table_id_seq;
       public               postgres    false    220            I           0    0    plant_table_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.plant_table_id_seq OWNED BY public.plant_table.id;
          public               postgres    false    219            W           2604    16650    care_details_table id    DEFAULT     ~   ALTER TABLE ONLY public.care_details_table ALTER COLUMN id SET DEFAULT nextval('public.care_details_table_id_seq'::regclass);
 D   ALTER TABLE public.care_details_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            a           2604    16752    companion_planting_table id    DEFAULT     �   ALTER TABLE ONLY public.companion_planting_table ALTER COLUMN id SET DEFAULT nextval('public.companion_planting_table_id_seq'::regclass);
 J   ALTER TABLE public.companion_planting_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    236    235    236            _           2604    16737    description_table id    DEFAULT     |   ALTER TABLE ONLY public.description_table ALTER COLUMN id SET DEFAULT nextval('public.description_table_id_seq'::regclass);
 C   ALTER TABLE public.description_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    234    234            [           2604    16698    flower_table id    DEFAULT     r   ALTER TABLE ONLY public.flower_table ALTER COLUMN id SET DEFAULT nextval('public.flower_table_id_seq'::regclass);
 >   ALTER TABLE public.flower_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    228    228            Y           2604    16683    fruit_table id    DEFAULT     p   ALTER TABLE ONLY public.fruit_table ALTER COLUMN id SET DEFAULT nextval('public.fruit_table_id_seq'::regclass);
 =   ALTER TABLE public.fruit_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            X           2604    16664    hardiness_table id    DEFAULT     x   ALTER TABLE ONLY public.hardiness_table ALTER COLUMN id SET DEFAULT nextval('public.hardiness_table_id_seq'::regclass);
 A   ALTER TABLE public.hardiness_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            S           2604    16623    plant_families id    DEFAULT     v   ALTER TABLE ONLY public.plant_families ALTER COLUMN id SET DEFAULT nextval('public.plant_families_id_seq'::regclass);
 @   ALTER TABLE public.plant_families ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            ^           2604    16727    plant_health_issues id    DEFAULT     �   ALTER TABLE ONLY public.plant_health_issues ALTER COLUMN id SET DEFAULT nextval('public.plant_health_issues_id_seq'::regclass);
 E   ALTER TABLE public.plant_health_issues ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    232    231    232            b           2604    16770    plant_images_table id    DEFAULT     ~   ALTER TABLE ONLY public.plant_images_table ALTER COLUMN id SET DEFAULT nextval('public.plant_images_table_id_seq'::regclass);
 D   ALTER TABLE public.plant_images_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    237    238    238            ]           2604    16713    plant_structure_table id    DEFAULT     �   ALTER TABLE ONLY public.plant_structure_table ALTER COLUMN id SET DEFAULT nextval('public.plant_structure_table_id_seq'::regclass);
 G   ALTER TABLE public.plant_structure_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    229    230            T           2604    16632    plant_table id    DEFAULT     p   ALTER TABLE ONLY public.plant_table ALTER COLUMN id SET DEFAULT nextval('public.plant_table_id_seq'::regclass);
 =   ALTER TABLE public.plant_table ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            (          0    16647    care_details_table 
   TABLE DATA           �   COPY public.care_details_table (id, plant_id, water_frequency_winter, water_frequency_summer, sun_requirements, min_temp, fertilizer_winter, fertilizer_summer, soil_type, soil_ph, humidity, degree_days, lifecycle, elevation) FROM stdin;
    public               postgres    false    222   _�       6          0    16749    companion_planting_table 
   TABLE DATA           g   COPY public.companion_planting_table (id, plant_id, companion_plant_id, relationship_type) FROM stdin;
    public               postgres    false    236   |�       4          0    16734    description_table 
   TABLE DATA           �   COPY public.description_table (id, plant_id, origin, general_description, fruit_description, history, use, toxicity) FROM stdin;
    public               postgres    false    234   ��       .          0    16695    flower_table 
   TABLE DATA           a   COPY public.flower_table (id, plant_id, type, color, edible, taste, nutrients, uses) FROM stdin;
    public               postgres    false    228   ��       ,          0    16680    fruit_table 
   TABLE DATA           k   COPY public.fruit_table (id, plant_id, type, color, edible, taste, nutrients, uses, seed_type) FROM stdin;
    public               postgres    false    226   Ӄ       *          0    16661    hardiness_table 
   TABLE DATA           �   COPY public.hardiness_table (id, plant_id, drought_resistance, heat_resistance, cold_resistance, flood_resistance, pest_resistance, light_sensitivity, nutrient_sensitivity) FROM stdin;
    public               postgres    false    224   ��       $          0    16620    plant_families 
   TABLE DATA           F   COPY public.plant_families (id, family_name, description) FROM stdin;
    public               postgres    false    218   �       2          0    16724    plant_health_issues 
   TABLE DATA           �   COPY public.plant_health_issues (id, name, type, life_cycle_time, plant_target, attack_description, prevention, treatment, category) FROM stdin;
    public               postgres    false    232   *�       8          0    16767    plant_images_table 
   TABLE DATA           ]   COPY public.plant_images_table (id, plant_id, image_url, image_type, is_primary) FROM stdin;
    public               postgres    false    238   G�       0          0    16710    plant_structure_table 
   TABLE DATA           �   COPY public.plant_structure_table (id, plant_id, plant_spacing, seed_depth, seed_germination_temp, seed_germination_time, days_to_maturity, pruning, height, spread) FROM stdin;
    public               postgres    false    230   d�       &          0    16629    plant_table 
   TABLE DATA           �   COPY public.plant_table (id, family_id, plant_name, variety_name, scientific_name, plant_type, environmental_type, yield_type, flower_type, created_at, updated_at) FROM stdin;
    public               postgres    false    220   ��       J           0    0    care_details_table_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.care_details_table_id_seq', 1, false);
          public               postgres    false    221            K           0    0    companion_planting_table_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.companion_planting_table_id_seq', 1, false);
          public               postgres    false    235            L           0    0    description_table_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.description_table_id_seq', 1, false);
          public               postgres    false    233            M           0    0    flower_table_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.flower_table_id_seq', 1, false);
          public               postgres    false    227            N           0    0    fruit_table_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.fruit_table_id_seq', 1, false);
          public               postgres    false    225            O           0    0    hardiness_table_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.hardiness_table_id_seq', 1, false);
          public               postgres    false    223            P           0    0    plant_families_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.plant_families_id_seq', 1, false);
          public               postgres    false    217            Q           0    0    plant_health_issues_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.plant_health_issues_id_seq', 1, false);
          public               postgres    false    231            R           0    0    plant_images_table_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.plant_images_table_id_seq', 1, false);
          public               postgres    false    237            S           0    0    plant_structure_table_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.plant_structure_table_id_seq', 1, false);
          public               postgres    false    229            T           0    0    plant_table_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.plant_table_id_seq', 1, false);
          public               postgres    false    219            v           2606    16654 *   care_details_table care_details_table_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.care_details_table
    ADD CONSTRAINT care_details_table_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.care_details_table DROP CONSTRAINT care_details_table_pkey;
       public                 postgres    false    222            �           2606    16755 6   companion_planting_table companion_planting_table_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.companion_planting_table
    ADD CONSTRAINT companion_planting_table_pkey PRIMARY KEY (id);
 `   ALTER TABLE ONLY public.companion_planting_table DROP CONSTRAINT companion_planting_table_pkey;
       public                 postgres    false    236            �           2606    16742 (   description_table description_table_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.description_table
    ADD CONSTRAINT description_table_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.description_table DROP CONSTRAINT description_table_pkey;
       public                 postgres    false    234            |           2606    16703    flower_table flower_table_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.flower_table
    ADD CONSTRAINT flower_table_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.flower_table DROP CONSTRAINT flower_table_pkey;
       public                 postgres    false    228            z           2606    16688    fruit_table fruit_table_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.fruit_table
    ADD CONSTRAINT fruit_table_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.fruit_table DROP CONSTRAINT fruit_table_pkey;
       public                 postgres    false    226            x           2606    16673 $   hardiness_table hardiness_table_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.hardiness_table
    ADD CONSTRAINT hardiness_table_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.hardiness_table DROP CONSTRAINT hardiness_table_pkey;
       public                 postgres    false    224            n           2606    16627 "   plant_families plant_families_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.plant_families
    ADD CONSTRAINT plant_families_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.plant_families DROP CONSTRAINT plant_families_pkey;
       public                 postgres    false    218            �           2606    16732 ,   plant_health_issues plant_health_issues_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.plant_health_issues
    ADD CONSTRAINT plant_health_issues_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.plant_health_issues DROP CONSTRAINT plant_health_issues_pkey;
       public                 postgres    false    232            �           2606    16775 *   plant_images_table plant_images_table_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.plant_images_table
    ADD CONSTRAINT plant_images_table_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.plant_images_table DROP CONSTRAINT plant_images_table_pkey;
       public                 postgres    false    238            ~           2606    16717 0   plant_structure_table plant_structure_table_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.plant_structure_table
    ADD CONSTRAINT plant_structure_table_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.plant_structure_table DROP CONSTRAINT plant_structure_table_pkey;
       public                 postgres    false    230            r           2606    16638    plant_table plant_table_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.plant_table
    ADD CONSTRAINT plant_table_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.plant_table DROP CONSTRAINT plant_table_pkey;
       public                 postgres    false    220            t           2606    16640 +   plant_table plant_table_scientific_name_key 
   CONSTRAINT     q   ALTER TABLE ONLY public.plant_table
    ADD CONSTRAINT plant_table_scientific_name_key UNIQUE (scientific_name);
 U   ALTER TABLE ONLY public.plant_table DROP CONSTRAINT plant_table_scientific_name_key;
       public                 postgres    false    220            �           1259    16783    idx_plant_images    INDEX     _   CREATE INDEX idx_plant_images ON public.plant_images_table USING btree (plant_id, is_primary);
 $   DROP INDEX public.idx_plant_images;
       public                 postgres    false    238    238            o           1259    16781    idx_plant_name    INDEX     L   CREATE INDEX idx_plant_name ON public.plant_table USING btree (plant_name);
 "   DROP INDEX public.idx_plant_name;
       public                 postgres    false    220            p           1259    16782    idx_scientific_name    INDEX     V   CREATE INDEX idx_scientific_name ON public.plant_table USING btree (scientific_name);
 '   DROP INDEX public.idx_scientific_name;
       public                 postgres    false    220            �           2606    16655 3   care_details_table care_details_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.care_details_table
    ADD CONSTRAINT care_details_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.care_details_table DROP CONSTRAINT care_details_table_plant_id_fkey;
       public               postgres    false    222    220    4722            �           2606    16761 I   companion_planting_table companion_planting_table_companion_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.companion_planting_table
    ADD CONSTRAINT companion_planting_table_companion_plant_id_fkey FOREIGN KEY (companion_plant_id) REFERENCES public.plant_table(id);
 s   ALTER TABLE ONLY public.companion_planting_table DROP CONSTRAINT companion_planting_table_companion_plant_id_fkey;
       public               postgres    false    236    220    4722            �           2606    16756 ?   companion_planting_table companion_planting_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.companion_planting_table
    ADD CONSTRAINT companion_planting_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.companion_planting_table DROP CONSTRAINT companion_planting_table_plant_id_fkey;
       public               postgres    false    4722    220    236            �           2606    16743 1   description_table description_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.description_table
    ADD CONSTRAINT description_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.description_table DROP CONSTRAINT description_table_plant_id_fkey;
       public               postgres    false    4722    234    220            �           2606    16704 '   flower_table flower_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.flower_table
    ADD CONSTRAINT flower_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.flower_table DROP CONSTRAINT flower_table_plant_id_fkey;
       public               postgres    false    4722    220    228            �           2606    16689 %   fruit_table fruit_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fruit_table
    ADD CONSTRAINT fruit_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.fruit_table DROP CONSTRAINT fruit_table_plant_id_fkey;
       public               postgres    false    220    4722    226            �           2606    16674 -   hardiness_table hardiness_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hardiness_table
    ADD CONSTRAINT hardiness_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.hardiness_table DROP CONSTRAINT hardiness_table_plant_id_fkey;
       public               postgres    false    220    4722    224            �           2606    16776 3   plant_images_table plant_images_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.plant_images_table
    ADD CONSTRAINT plant_images_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.plant_images_table DROP CONSTRAINT plant_images_table_plant_id_fkey;
       public               postgres    false    238    4722    220            �           2606    16718 9   plant_structure_table plant_structure_table_plant_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.plant_structure_table
    ADD CONSTRAINT plant_structure_table_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plant_table(id) ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.plant_structure_table DROP CONSTRAINT plant_structure_table_plant_id_fkey;
       public               postgres    false    230    220    4722            �           2606    16641 &   plant_table plant_table_family_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.plant_table
    ADD CONSTRAINT plant_table_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.plant_families(id);
 P   ALTER TABLE ONLY public.plant_table DROP CONSTRAINT plant_table_family_id_fkey;
       public               postgres    false    4718    220    218            (      x������ � �      6      x������ � �      4      x������ � �      .      x������ � �      ,      x������ � �      *      x������ � �      $      x������ � �      2      x������ � �      8      x������ � �      0      x������ � �      &      x������ � �     