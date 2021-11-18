-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 02-Nov-2020 às 15:01
-- Versão do servidor: 5.6.49-cll-lve
-- versão do PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `nfcovid`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `territorio`
--

CREATE TABLE `territorio` (
  `id` int(3) NOT NULL,
  `ter_nombre` varchar(50) NOT NULL,
  `ter_iso_alpha3` varchar(3) NOT NULL,
  `ter_nombre_alt` varchar(100) NOT NULL,
  `ter_soberano` int(1) NOT NULL,
  `ter_descripcion` varchar(100) NOT NULL,
  `ter_ter_id` int(3) NOT NULL COMMENT 'Territorio pertenece',
  `ter_cont_id` int(2) NOT NULL COMMENT 'Continente ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `territorio`
--

INSERT INTO `territorio` (`id`, `ter_nombre`, `ter_iso_alpha3`, `ter_nombre_alt`, `ter_soberano`, `ter_descripcion`, `ter_ter_id`, `ter_cont_id`) VALUES
(1, 'Sin definir', '', 'Sin definir', 1, 'Sin definir', 1, 1),
(2, 'Acrotiri y Dhekelia', '', 'Áreas de Base Soberana de Acrotiri y Dhekelia', 0, 'Territorio de ultramar', 178, 9),
(3, 'Afganistán', 'AFG', 'República Islámica de Afganistán', 1, '', 3, 9),
(4, 'Albania', 'ALB', 'República de Albania', 1, '', 4, 10),
(5, 'Alemania', 'DEU', 'República Federal de Alemania', 1, '', 5, 10),
(6, 'Andorra', 'AND', 'Principado de Andorra', 1, '', 6, 10),
(7, 'Angola', 'AGO', 'República de Angola', 1, '', 7, 2),
(8, 'Anguila', 'AIA', 'Anguilla', 0, 'Territorio de ultramar', 178, 8),
(9, 'Antigua y Barbuda', 'ATG', '', 1, '', 9, 8),
(10, 'Arabia Saudita', 'SAU', 'Reino de Arabia Saudita', 1, '', 10, 9),
(11, 'Argelia', 'DZA', 'República Argelina Democrática y Popular', 1, '', 11, 2),
(12, 'Argentina', 'ARG', 'República Argentina', 1, '', 12, 6),
(13, 'Armenia', 'ARM', 'República de Armenia', 1, 'País Euroasiático', 13, 9),
(14, 'Aruba', 'ABW', 'País de Aruba', 0, 'País constituyente del Reino de los Países Bajos', 166, 8),
(15, 'Australia', 'AUS', 'Mancomunidad de Australia', 1, '', 15, 11),
(16, 'Austria', 'AUT', 'República de Austria', 1, '', 16, 10),
(17, 'Azerbaiyán', 'AZE', 'República de Azerbaiyán', 1, 'País Euroasiático', 17, 9),
(18, 'Bahamas', 'BHS', 'Mancomunidad de las Bahamas', 1, '', 18, 8),
(19, 'Bangladés', 'BGD', 'República Popular de Bangladés;Bangladesh', 1, '', 19, 9),
(20, 'Barbados', 'BRB', '', 1, '', 20, 8),
(21, 'Baréin', 'BHR', 'Reino de Baréin', 1, '', 21, 9),
(22, 'Bélgica', 'BEL', 'Reino de Bélgica', 1, '', 22, 10),
(23, 'Belice', 'BLZ', '', 1, '', 23, 4),
(24, 'Benín', 'BEN', 'República de Benín', 1, '', 24, 2),
(25, 'Bermudas', 'BMU', '', 0, 'Territorio de ultramar', 178, 8),
(26, 'Bielorrusia', 'BLR', 'República de Belarús', 1, '', 26, 10),
(27, 'Birmania', 'MMR', 'República de la Unión de Myanmar', 1, '', 27, 9),
(28, 'Bolivia', 'BOL', 'Estado Plurinacional de Bolivia', 1, '', 28, 6),
(29, 'Bonaire', 'BES', 'Entidad pública Bonaire', 0, 'Municipio especial', 166, 8),
(30, 'Bosnia y Herzegovina', 'BIH', '', 1, '', 30, 10),
(31, 'Botsuana', 'BWA', 'República de Botsuana;Botswana', 1, '', 31, 2),
(32, 'Brasil', 'BRA', 'República Federativa del Brasil​​​​', 1, '', 32, 6),
(33, 'Brunéi', 'BRN', 'Estado de Brunéi Darussalam', 1, '', 33, 9),
(34, 'Bulgaria', 'BGR', 'República de Bulgaria', 1, '', 34, 10),
(35, 'Burkina Faso', 'BFA', '', 1, '', 35, 2),
(36, 'Burundi', 'BDI', 'República de Burundi', 1, '', 36, 2),
(37, 'Bután', 'BTN', 'Reino de Bután', 1, '', 37, 9),
(38, 'Cabo Verde', 'CPV', 'República de Cabo Verde', 1, '', 38, 2),
(39, 'Camboya', 'KHM', 'Reino de Camboya', 1, '', 39, 9),
(40, 'Camerún', 'CMR', 'República de Camerún', 1, '', 40, 2),
(41, 'Canadá', 'CAN', '', 1, '', 41, 5),
(42, 'Chad', 'TCD', 'República del Chad', 1, '', 42, 2),
(43, 'Chile', 'CHL', 'República de Chile', 1, '', 43, 6),
(44, 'China', 'CHN', 'República Popular China', 1, '', 44, 9),
(45, 'Chipre', 'CYP', 'República de Chipre', 1, 'País Euroasiático', 45, 9),
(46, 'Ciudad del Vaticano', 'VAT', 'Estado de la Ciudad del Vaticano', 1, '', 46, 10),
(47, 'Colombia', 'COL', 'República de Colombia', 1, '', 47, 6),
(48, 'Comoras', 'COM', 'Unión de las Comoras', 1, '', 48, 2),
(49, 'Corea del Norte', 'PRK', 'República Popular Democrática de Corea', 1, '', 49, 9),
(50, 'Corea del Sur', 'KOR', 'República de Corea', 1, '', 50, 9),
(51, 'Costa de Marfil', 'CIV', 'República de Costa de Marfil;Côte d’Ivoire', 1, '', 51, 2),
(52, 'Costa Rica', 'CRI', 'República de Costa Rica', 1, '', 52, 4),
(53, 'Croacia', 'HRV', 'República de Croacia', 1, '', 53, 10),
(54, 'Cuba', 'CUB', 'República de Cuba', 1, '', 54, 8),
(55, 'Curaçao', 'CUW', 'País de Curazao', 0, 'País constituyente del Reino de los Países Bajos', 166, 8),
(56, 'Dinamarca', 'DNK', 'Reino de Dinamarca', 1, '', 56, 10),
(57, 'Dominica', 'DMA', 'Mancomunidad de Dominica', 1, '', 57, 8),
(58, 'Ecuador', 'ECU', 'República del Ecuador', 1, '', 58, 6),
(59, 'Egipto', 'EGY', 'República Árabe de Egipto', 1, '', 59, 2),
(60, 'El Salvador', 'SLV', 'República de El Salvador', 1, '', 60, 4),
(61, 'Emiratos Árabes Unidos', 'ARE', 'Estado de los Emiratos Árabes Unidos', 1, '', 61, 9),
(62, 'Eritrea', 'ERI', 'Estado de Eritrea', 1, '', 62, 2),
(63, 'Escocia', '', '', 0, 'País constituyente del Reino Unido', 177, 10),
(64, 'Eslovaquia', 'SVK', 'República Eslovaca', 1, '', 64, 10),
(65, 'Eslovenia', 'SVN', 'República de Eslovenia', 1, '', 65, 10),
(66, 'España', 'ESP', 'Reino de España', 1, '', 66, 10),
(67, 'Estados Unidos de América', 'USA', 'Estados Unidos de América', 1, '', 67, 5),
(68, 'Estonia', 'EST', 'República de Estonia', 1, '', 68, 10),
(69, 'Esuatini', 'SWZ', 'Reino de Suazilandia', 1, '', 69, 2),
(70, 'Etiopía', 'ETH', 'República Democrática Federal de Etiopía', 1, '', 70, 2),
(71, 'Filipinas', 'PHL', 'República de Filipinas', 1, '', 71, 9),
(72, 'Finlandia', 'FIN', 'República de Finlandia', 1, '', 72, 10),
(73, 'Fiyi', 'FJI', 'República de Fiyi', 1, '', 73, 11),
(74, 'Francia', 'FRA', 'República Francesa', 1, '', 74, 10),
(75, 'Gabón', 'GAB', 'República Gabonesa', 1, '', 75, 2),
(76, 'Gales', '', '', 0, 'País constituyente del Reino Unido', 178, 10),
(77, 'Gambia', 'GMB', 'República de Gambia', 1, '', 77, 2),
(78, 'Georgia', 'GEO', '', 1, 'País Euroasiático', 78, 9),
(79, 'Ghana', 'GHA', 'República de Ghana', 1, '', 79, 2),
(80, 'Gibraltar', 'GIB', '', 0, 'Territorio de ultramar', 178, 10),
(81, 'Granada', 'GRD', '', 1, '', 81, 8),
(82, 'Grecia', 'GRC', 'República Helénica', 1, '', 82, 10),
(83, 'Guam', 'GUM', 'Guaján', 0, 'Territorio no incorporado, organizado', 59, 11),
(84, 'Guatemala', 'GTM', 'República de Guatemala', 1, '', 84, 4),
(85, 'Guayana Francesa', 'GUF', '', 0, 'Región y departamento de ultramar', 74, 6),
(86, 'Guernsey', 'GGY', 'Bailía de Guernsey', 0, 'Dependencia de la Corona Británica', 178, 10),
(87, 'Guinea', 'GIN', 'República de Guinea', 1, '', 87, 2),
(88, 'Guinea Ecuatorial', 'GNQ', 'República de Guinea Ecuatorial', 1, '', 88, 2),
(89, 'Guinea-Bisáu', 'GNB', 'República de Guinea-Bisáu​', 1, '', 89, 2),
(90, 'Guyana', 'GUY', 'República Cooperativa de Guyana', 1, '', 90, 6),
(91, 'Haití', 'HTI', 'República de Haití', 1, '', 91, 8),
(92, 'Honduras', 'HND', 'República de Honduras', 1, '', 92, 4),
(93, 'Hong Kong', 'HKG', 'Región Administrativa Especial de Hong Kong', 0, 'Región administrativa especial', 44, 9),
(94, 'Hungría', 'HUN', '', 1, '', 94, 10),
(95, 'India', 'IND', 'República de la India', 1, '', 95, 9),
(96, 'Indonesia', 'IDN', 'República de Indonesia', 1, '', 96, 9),
(97, 'Inglaterra', '', '', 0, 'País constituyente del Reino Unido', 178, 10),
(98, 'Irak', 'IRQ', 'República de Irak;Iraq', 1, '', 98, 9),
(99, 'Irán', 'IRN', '', 1, '', 99, 9),
(100, 'Irlanda', 'IRL', 'República de Irlanda', 1, '', 100, 10),
(101, 'Irlanda del Norte', '', '', 0, 'País constituyente del Reino Unido', 178, 10),
(102, 'Isla de Man', 'IMN', '', 0, 'Dependencia de la Corona Británica', 178, 10),
(103, 'Islandia', 'ISL', 'República Islámica de Irán', 1, '', 103, 10),
(104, 'Islas Caimán', 'CYM', '', 0, 'Territorio de ultramar', 178, 8),
(105, 'Islas Cook', 'COK', '', 0, 'Estado libre asociado', 164, 11),
(106, 'Islas Feroe', 'FRO', '', 0, 'País autónomo', 56, 10),
(107, 'Islas Georgias del Sur y Sándwich del Sur', 'SGS', '', 0, 'Territorio de ultramar', 178, 6),
(108, 'Islas Malvinas', 'FLK', '', 0, 'Territorio de ultramar', 178, 6),
(109, 'Islas Marianas del Norte', 'MNP', 'Mancomunidad de las Islas Marianas del Norte', 0, 'Territorio no incorporado, organizado', 59, 11),
(110, 'Islas Marshall', 'MHL', 'República de las Islas Marshall', 1, '', 110, 11),
(111, 'Islas Pitcairn', 'PCN', 'Territorio británico de ultramar Islas Pitcairn, Henderson, Ducie y Oeno', 0, 'Territorio de ultramar', 178, 11),
(112, 'Islas Salomón', 'SLB', '', 1, '', 112, 11),
(113, 'Islas Turcas y Caicos', 'TCA', '', 0, 'Territorio de ultramar', 178, 8),
(114, 'Islas Vírgenes Británicas', 'VGB', '', 0, 'Territorio de ultramar', 178, 8),
(115, 'Islas Vírgenes de los Estados Unidos', 'VIR', 'Islas Vírgenes Americanas', 0, 'Territorio no incorporado, organizado', 67, 8),
(116, 'Israel', 'ISR', 'Estado de Israel', 1, '', 116, 9),
(117, 'Italia', 'ITA', 'República Italiana', 1, '', 117, 10),
(118, 'Jamaica', 'JAM', '', 1, '', 118, 8),
(119, 'Japón', 'JPN', 'Estado del Japón', 1, '', 119, 9),
(120, 'Jersey', 'JEY', 'Bailía de Jersey', 0, 'Dependencia de la Corona Británica', 178, 10),
(121, 'Jordania', 'JOR', 'Reino Hachemita de Jordania', 1, '', 121, 9),
(122, 'Kazajistán', 'KAZ', 'República de Kazajstán', 1, 'País Euroasiático', 122, 9),
(123, 'Kenia', 'KEN', 'República de Kenia', 1, '', 123, 2),
(124, 'Kirguistán', 'KGZ', 'República Kirguisa', 1, '', 124, 9),
(125, 'Kiribati', 'KIR', 'República de Kiribati', 1, '', 125, 11),
(126, 'Kosovo', '', 'República de Kosovo', 0, 'Estado con reconocimiento limitado', 200, 10),
(127, 'Kuwait', 'KWT', 'Estado de Kuwait', 1, '', 127, 9),
(128, 'Laos', 'LAO', 'República Democrática Popular Lao​', 1, '', 128, 9),
(129, 'Lesoto', 'LSO', 'Reino de Lesoto', 1, '', 129, 2),
(130, 'Letonia', 'LVA', 'República de Letonia', 1, '', 130, 10),
(131, 'Líbano', 'LBN', 'República Libanesa', 1, '', 131, 9),
(132, 'Liberia', 'LBR', 'República de Liberia', 1, '', 132, 2),
(133, 'Libia', 'LBY', 'Estado de Libia', 1, '', 133, 2),
(134, 'Liechtenstein', 'LIE', 'Principado de Liechtenstein', 1, '', 134, 10),
(135, 'Lituania', 'LTU', 'República de Lituania', 1, '', 135, 10),
(136, 'Luxemburgo', 'LUX', 'Gran Ducado de Luxemburgo', 1, '', 136, 10),
(137, 'Macao', 'MAC', 'Región Administrativa Especial de Macao', 0, 'Región administrativa especial', 44, 9),
(138, 'Macedonia del Norte', 'MKD', 'República de Macedonia del Norte', 1, '', 138, 10),
(139, 'Madagascar', 'MDG', 'República de Madagascar', 1, '', 139, 2),
(140, 'Malasia', 'MYS', 'Federación de Malasia', 1, '', 140, 9),
(141, 'Malaui', 'MWI', 'República de Malaui;Malawi', 1, '', 141, 2),
(142, 'Maldivas', 'MDV', 'República de Maldivas', 1, '', 142, 9),
(143, 'Malí', 'MLI', 'República de Malí', 1, '', 143, 2),
(144, 'Malta', 'MLT', 'República de Malta', 1, '', 144, 10),
(145, 'Marruecos', 'MAR', 'Reino de Marruecos', 1, '', 145, 2),
(146, 'Mauricio', 'MUS', 'República de Mauricio', 1, '', 146, 2),
(147, 'Mauritania', 'MRT', 'República Islámica de Mauritania', 1, '', 147, 2),
(148, 'México', 'MEX', 'Estados Unidos Mexicanos', 1, '', 148, 5),
(149, 'Micronesia', 'FSM', '', 1, '', 149, 11),
(150, 'Moldavia', 'MDA', 'República de Moldavia', 1, '', 150, 10),
(151, 'Mónaco', 'MCO', 'Principado de Mónaco', 1, '', 151, 10),
(152, 'Mongolia', 'MNG', '', 1, '', 152, 9),
(153, 'Montenegro', 'MNE', '', 1, '', 153, 10),
(154, 'Montserrat', 'MSR', '', 0, 'Territorio de ultramar', 178, 8),
(155, 'Mozambique', 'MOZ', 'República de Mozambique', 1, '', 155, 2),
(156, 'Namibia', 'NAM', 'República de Namibia', 1, '', 156, 2),
(157, 'Nauru', 'NRU', 'República de Nauru', 1, '', 157, 11),
(158, 'Nepal', 'NPL', 'República Federal Democrática de Nepal​', 1, '', 158, 9),
(159, 'Nicaragua', 'NIC', 'República de Nicaragua', 1, '', 159, 4),
(160, 'Níger', 'NER', 'República del Níger', 1, '', 160, 2),
(161, 'Nigeria', 'NGA', 'República Federal de Nigeria', 1, '', 161, 2),
(162, 'Noruega', 'NOR', 'Reino de Noruega', 1, '', 162, 10),
(163, 'Nueva Caledonia', 'NCL', '', 0, 'Territorio de ultramar', 74, 11),
(164, 'Nueva Zelanda', 'NZL', '', 1, '', 164, 11),
(165, 'Omán', 'OMN', 'Sultanato de Omán​​​', 1, '', 165, 9),
(166, 'Países Bajos', 'NLD', 'Reino de los Países Bajos;Holanda', 1, '', 166, 10),
(167, 'Pakistán', 'PAK', 'República Islámica de Pakistán', 1, '', 167, 9),
(168, 'Palaos', 'PLW', 'República de Palaos', 1, '', 168, 11),
(169, 'Palestina', 'PSE', 'Estado de Palestina', 0, 'Estado con reconocimiento limitado', 116, 9),
(170, 'Panamá', 'PAN', 'República de Panamá', 1, '', 170, 4),
(171, 'Papúa Nueva Guinea', 'PNG', 'Estado Independiente de Papúa Nueva Guinea', 1, '', 171, 11),
(172, 'Paraguay', 'PRY', 'República del Paraguay', 1, '', 172, 6),
(173, 'Perú', 'PER', 'República del Perú', 1, '', 173, 6),
(174, 'Polonia', 'POL', 'República de Polonia', 1, '', 174, 10),
(175, 'Portugal', 'PRT', 'República Portuguesa', 1, '', 175, 10),
(176, 'Puerto Rico', 'PRI', 'Estado Libre Asociado de Puerto Rico', 0, 'Territorio no incorporado, organizado', 59, 8),
(177, 'Qatar', 'QAT', 'Estado de Catar', 1, '', 177, 9),
(178, 'Reino Unido', 'GBR', 'Reino Unido de Gran Bretaña e Irlanda del Norte', 1, '', 178, 10),
(179, 'República Centroafricana', 'CAF', '', 1, '', 179, 2),
(180, 'República Checa', 'CZE', 'Chequia ', 1, '', 180, 10),
(181, 'República del Congo', 'COG', '', 1, '', 181, 2),
(182, 'República Democrática del Congo', 'COD', '', 1, '', 182, 2),
(183, 'República Dominicana', 'DOM', '', 1, '', 183, 8),
(184, 'Ruanda', 'RWA', 'República de Ruanda', 1, '', 184, 2),
(185, 'Rumanía', 'ROU', '', 1, '', 185, 10),
(186, 'Rusia', 'RUS', 'Federación de Rusia', 1, 'País Euroasiático', 186, 9),
(187, 'Saba', 'BES', 'Entidad pública Saba', 0, 'Municipio especial', 166, 8),
(188, 'Samoa', 'WSM', 'Estado Independiente de Samoa', 1, '', 188, 11),
(189, 'Samoa Estadounidense', 'ASM', 'Samoa Americana', 0, 'Territorio no incorporado, no organizado', 59, 11),
(190, 'San Cristóbal y Nieves', 'KNA', 'Federación de San Cristóbal y Nieves', 1, '', 190, 8),
(191, 'San Eustaquio', 'BES', 'Entidad pública San Eustaquio', 0, 'Municipio especial', 166, 8),
(192, 'San Marino', 'SMR', 'Serenísima República de San Marino', 1, '', 192, 10),
(193, 'San Martín', 'MAF', 'Saint-Martin', 0, 'Territorio de ultramar', 74, 8),
(194, 'San Martín', 'SXM', 'Sint Maarten', 0, 'País constituyente del Reino de los Países Bajos', 166, 8),
(195, 'San Vicente y las Granadinas', 'VCT', '', 1, '', 195, 8),
(196, 'Santa Elena, Ascensión y Tristán de Acuña', 'SHN', '', 0, 'Territorio de ultramar', 178, 2),
(197, 'Santa Lucía', 'LCA', '', 1, '', 197, 8),
(198, 'Santo Tomé y Príncipe', 'STP', 'República Democrática de Santo Tomé y Príncipe', 1, '', 198, 2),
(199, 'Senegal', 'SEN', 'República del Senegal', 1, '', 199, 2),
(200, 'Serbia', 'SRB', 'República de Serbia', 1, '', 200, 10),
(201, 'Seychelles', 'SYC', 'República de las Seychelles', 1, '', 201, 2),
(202, 'Sierra Leona', 'SLE', 'República de Sierra Leona', 1, '', 202, 2),
(203, 'Singapur', 'SGP', 'República de Singapur', 1, '', 203, 9),
(204, 'Siria', 'SYR', 'República Árabe Siria', 1, '', 204, 9),
(205, 'Somalia', 'SOM', 'República Federal de Somalia', 1, '', 205, 2),
(206, 'Sri Lanka', 'LKA', 'República Democrática Socialista de Sri Lanka', 1, '', 206, 9),
(207, 'Sudáfrica', 'ZAF', 'República de Sudáfrica', 1, '', 207, 2),
(208, 'Sudán', 'SDN', 'República del Sudán', 1, '', 208, 2),
(209, 'Sudán del Sur', 'SSD', 'República de Sudán del Sur​', 1, '', 209, 2),
(210, 'Suecia', 'SWE', 'Reino de Suecia', 1, '', 210, 10),
(211, 'Suiza', 'CHE', 'Confederación Suiza', 1, '', 211, 10),
(212, 'Surinam', 'SUR', 'República de Surinam', 1, '', 212, 6),
(213, 'Tahití', '', '', 0, 'Territorio de ultramar', 74, 11),
(214, 'Tailandia', 'THA', 'Reino de Tailandia', 1, '', 214, 9),
(215, 'Taiwán', '', 'República de China', 0, 'Estado con reconocimiento limitado', 44, 9),
(216, 'Tanzania', 'TZA', 'República Unida de Tanzania', 1, '', 216, 2),
(217, 'Tayikistán', 'TJK', 'República de Tayikistán', 1, '', 217, 9),
(218, 'Territorio Antártico Británico', '', '', 0, 'Territorio de ultramar', 178, 7),
(219, 'Territorio Británico del Océano Índico', 'IOT', '', 0, 'Territorio de ultramar', 178, 9),
(220, 'Timor Oriental', 'TLS', 'República Democrática de Timor-Oriental', 1, '', 220, 9),
(221, 'Togo', 'TGO', 'República Togolesa', 1, '', 221, 2),
(222, 'Tonga', 'TON', 'Reino de Tonga', 1, '', 222, 11),
(223, 'Trinidad y Tobago', 'TTO', 'República de Trinidad y Tobago', 1, '', 223, 8),
(224, 'Túnez', 'TUN', 'República Tunecina', 1, '', 224, 2),
(225, 'Turkmenistán', 'TKM', 'República de Turkmenistán', 1, '', 225, 9),
(226, 'Turquía', 'TUR', 'República de Turquía', 1, 'País Euroasiático', 226, 9),
(227, 'Tuvalu', 'TUV', '', 1, '', 227, 11),
(228, 'Ucrania', 'UKR', '', 1, '', 228, 10),
(229, 'Uganda', 'UGA', 'República de Uganda', 1, '', 229, 2),
(230, 'Uruguay', 'URY', 'República Oriental del Uruguay', 1, '', 230, 6),
(231, 'Uzbekistán', 'UZB', 'República de Uzbekistán', 1, '', 231, 9),
(232, 'Vanuatu', 'VUT', 'República de Vanuatu', 1, '', 232, 11),
(233, 'Venezuela', 'VEN', 'República Bolivariana de Venezuela', 1, '', 233, 6),
(234, 'Vietnam', 'VNM', 'República Socialista de Vietnam', 1, '', 234, 9),
(235, 'Yemen', 'YEM', 'República de Yemen', 1, '', 235, 9),
(236, 'Yibuti', 'DJI', 'República de Yibuti', 1, '', 236, 2),
(237, 'Zambia', 'ZMB', 'República de Zambia', 1, '', 237, 2),
(238, 'Zimbabue', 'ZWE', 'República de Zimbabue', 1, '', 238, 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `territorio`
--
ALTER TABLE `territorio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `territorio_ibfk_id` (`ter_ter_id`),
  ADD KEY `territorio_ibfk_continente_id` (`ter_cont_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `territorio`
--
ALTER TABLE `territorio`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=239;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `territorio`
--
ALTER TABLE `territorio`
  ADD CONSTRAINT `territorio_ibfk_continente_id` FOREIGN KEY (`ter_cont_id`) REFERENCES `continente` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `territorio_ibfk_id` FOREIGN KEY (`ter_ter_id`) REFERENCES `territorio` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
