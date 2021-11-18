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
-- Estrutura da tabela `regioncol_nat`
--

CREATE TABLE `regioncol_nat` (
  `id` int(1) NOT NULL,
  `rgn_nombre` varchar(15) NOT NULL,
  `rgn_ter_id` int(3) NOT NULL COMMENT 'Territorio ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `regioncol_nat`
--

INSERT INTO `regioncol_nat` (`id`, `rgn_nombre`, `rgn_ter_id`) VALUES
(1, 'Sin definir', 47),
(2, 'Amazónica', 47),
(3, 'Andina', 47),
(4, 'Caribe', 47),
(5, 'De la Orinoquía', 47),
(6, 'Pacífica', 47);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `regioncol_nat`
--
ALTER TABLE `regioncol_nat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `regioncol_nat_ibfk_territorio_id` (`rgn_ter_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `regioncol_nat`
--
ALTER TABLE `regioncol_nat`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `regioncol_nat`
--
ALTER TABLE `regioncol_nat`
  ADD CONSTRAINT `regioncol_nat_ibfk_territorio_id` FOREIGN KEY (`rgn_ter_id`) REFERENCES `territorio` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
