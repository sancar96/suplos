<?php

if(isset($_POST['action'])){
    $action = $_POST['action'];

    if($action == "insert"){
        $data = $_POST['data'];
        $con = new Wish();
        $con->saveWish($data);
    }

    if($action == "select"){
        $con = new Wish();
        $con->getWishes();
    }

    if($action == "delete"){
        $id = $_POST['id'];
        $con = new Wish();
        $con->deleteWish($id);
    }

    if($action == "report"){
        $data = $_POST['data'];
        $con = new Wish();
        $con->report($data);
    }

}
class Wish{

    public function saveWish($data){
        try{
            $mbd = new PDO('mysql:host=localhost;dbname=intelcost_bienes', 'root', '');
            $sqlSelect = 'SELECT count(*) FROM wishes WHERE idJson='.$data["Id"].' AND logicodeleted=0';
            $nRows = $mbd->query($sqlSelect)->fetchColumn();
            if($nRows > 0){
                echo json_encode(array('msg' => "El registro ya se encuentra almacenado"));
            }else{
                $dataSql = [
                    'idJson' => $data["Id"],
                    'dataJson' => json_encode($data),
                    'logicoDeleted' => 0,
                    'created' => time(),
                    'updated' => time()
                ];
                $sql = "INSERT INTO wishes (idJson, dataJson, logicoDeleted, created, updated) VALUES (:idJson, :dataJson, :logicoDeleted, :created, :updated)";
                $mbd->prepare($sql)->execute($dataSql);
                echo json_encode(array('msg' => "Registro almacenado exitosamente"));
            }
        } catch (InvalidArgumentException $msg) {
            return array('message' => $msg->getMessage());
        } catch (Exception $ex) {
            return array('message' => 'Ha ocurrido un error, contacte al administrador');
        }
    }

    public function getWishes(){
        try{
            $mbd = new PDO('mysql:host=localhost;dbname=intelcost_bienes', 'root', '');
            $sqlSelect = $mbd->query('SELECT * FROM wishes WHERE logicodeleted=0');
            $obj1 = new \stdClass;
            $arr = array();
            while ($row = $sqlSelect->fetch()) {
                array_push($arr, $row['dataJson']);
            }
            echo json_encode(array('arr' => $arr));
        } catch (InvalidArgumentException $msg) {
            return array('message' => $msg->getMessage());
        } catch (Exception $ex) {
            return array('message' => 'Ha ocurrido un error, contacte al administrador');
        }
    }

    public function deleteWish($id){
        try{
            $mbd = new PDO('mysql:host=localhost;dbname=intelcost_bienes', 'root', '');
            $dataSql = [
                'idJson' => $id,
                'updated' => time()
            ];
            $sql = "UPDATE wishes SET logicodeleted=1, updated=:updated WHERE idJson=:idJson";
            $mbd->prepare($sql)->execute($dataSql);
            echo json_encode(array('msg' => "Registro eliminado exitosamente"));
        } catch (InvalidArgumentException $msg) {
            return array('message' => $msg->getMessage());
        } catch (Exception $ex) {
            return array('message' => 'Ha ocurrido un error, contacte al administrador');
        }
    }

    public function report($productResult) {
        $timestamp = time();
        $myfile = fopen('../excel/Bienes_Intelcost'.$timestamp.'.xls', "w") or die("Unable to open file!");
        $fileName = 'Bienes_Intelcost'.$timestamp.'.xls';
        //ESCRIBIMOS LOS TITULOS EN EL ARCHIVO
        fwrite($myfile, "Id"."\t"."Direccion"."\t"."Ciudad"."\t"."Telefono"."\t"."Codigo_Postal"."\t"."Tipo"."\t"."Precio"."\n");
        //ESCRIBIMOS LA DATA EN EL ARCHIVO
        foreach($productResult as $data){
            $strData = $data["Id"]."\t".$data["Direccion"]."\t".$data["Ciudad"]."\t".$data["Telefono"]."\t".$data["Codigo_Postal"]."\t".$data["Tipo"]."\t".$data["Precio"]. "\n";
            fwrite($myfile, $strData);
        }
        fclose($myfile);
        echo json_encode(array('msg' => 'excel/'.$fileName));
    }

}