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
-- Estrutura da tabela `regioncol_dnp`
--

CREATE TABLE `regioncol_dnp` (
  `id` int(1) NOT NULL,
  `rgd_nombre` varchar(24) NOT NULL,
  `rgd_ter_id` int(3) NOT NULL COMMENT 'Territorio ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `regioncol_dnp`
--

INSERT INTO `regioncol_dnp` (`id`, `rgd_nombre`, `rgd_ter_id`) VALUES
(1, 'Sin definir', 47),
(2, 'Caribe', 47),
(3, 'Centro Oriente', 47),
(4, 'Centro Sur', 47),
(5, 'Eje Cafetero - Antioquia', 47),
(6, 'Llano', 47),
(7, 'Pacífico', 47);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `regioncol_dnp`
--
ALTER TABLE `regioncol_dnp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `regioncol_dnp_ibfk_territorio_id` (`rgd_ter_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `regioncol_dnp`
--
ALTER TABLE `regioncol_dnp`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `regioncol_dnp`
--
ALTER TABLE `regioncol_dnp`
  ADD CONSTRAINT `regioncol_dnp_ibfk_territorio_id` FOREIGN KEY (`rgd_ter_id`) REFERENCES `territorio` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
