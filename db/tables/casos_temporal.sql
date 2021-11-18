-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 02-Nov-2020 às 15:00
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
-- Estrutura da tabela `casos_temporal`
--

CREATE TABLE `casos_temporal` (
  `id` int(7) NOT NULL,
  `fecha_notificacion` varchar(23) NOT NULL,
  `codigo_municipio` int(6) NOT NULL,
  `ciudad_ubicacion` varchar(50) NOT NULL,
  `departamento_distrito` varchar(50) NOT NULL,
  `atencion` varchar(20) NOT NULL,
  `edad` int(3) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `pais_procedencia` varchar(50) NOT NULL,
  `fis` varchar(23) NOT NULL,
  `fecha_muerte` varchar(23) NOT NULL,
  `fecha_diagnostico` varchar(23) NOT NULL,
  `fecha_recuperado` varchar(23) NOT NULL,
  `fecha_reporte_web` varchar(23) NOT NULL,
  `tipo_recuperacion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `casos_temporal`
--
ALTER TABLE `casos_temporal`
  ADD KEY `codigo_municipio` (`codigo_municipio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
