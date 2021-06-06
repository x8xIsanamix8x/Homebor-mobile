<?php

	function connect(){
		$user = "u702954182_xeon";
		$password = "Xeon.2801";
		$server = "localhost";
		$db = "u702954182_xeondb";

		try {
			$result = new PDO("mysql:host=localhost; dbname=u702954182_xeondb", "u702954182_xeon", "Xeon.2801");
			$result->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			

		} catch (PDOException $e) {
			throw new \Exception("ERROR: " . $e->getMessage());
			
		}
		return $result;

	}

?>