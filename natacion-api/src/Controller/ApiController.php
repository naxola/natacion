<?php
/**
 * ApiController.php
 *
 * API Controller
 *
 * @category   Controller
 * @package    MyKanban
 * @author     Francisco Ugalde
 * @copyright  2018 www.franciscougalde.com
 * @license    http://www.php.net/license/3_0.txt  PHP License 3.0
 */

namespace App\Controller;

use App\Entity\User;
use App\Entity\Student;
use App\Entity\RegTurno;
use App\Entity\RegInscripcion;
use App\Entity\RegInscripciones;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;
use DateTime;

/**
 * Class ApiController
 *
 * @Route("/api")
 */
class ApiController extends FOSRestController
{
    /**
     * @Rest\Post("/login_check", name="user_login_check")
     *
     * @SWG\Response(
     *     response=200,
     *     description="User was logged in successfully"
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="User was not logged in successfully"
     * )
     *
     * @SWG\Parameter(
     *     name="_username",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={
     *     }
     * )
     *
     * @SWG\Parameter(
     *     name="_password",
     *     in="body",
     *     type="string",
     *     description="The password",
     *     schema={}
     * )
     *
     * @SWG\Tag(name="User")
     */
    public function getLoginCheckAction() {}
    /**
     * @Rest\Post("/register", name="user_register")
     *
     * @SWG\Response(
     *     response=201,
     *     description="User was successfully registered"
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="User was not successfully registered"
     * )
     *
     * @SWG\Parameter(
     *     name="_name",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="_email",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="_username",
     *     in="body",
     *     type="string",
     *     description="The username",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="_password",
     *     in="query",
     *     type="string",
     *     description="The password"
     * )
     *
     * @SWG\Tag(name="User")
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $encoder) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
 
        $user = [];
        $message = "";
 
        try {
            $code = 200;
            $error = false;
 
            $firstname = $request->request->get('firstName');
            $lastname = $request->request->get('lastName');
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $roles = $request->request->get('roles');
            
            $user = new User();
            $user->setFirstName($firstname);
            $user->setLastName($lastname);
            $user->setEmail($email);
            $user->setUsername($email);
            $user->setRoles($roles);
            $user->setPlainPassword($password);
            $user->setPassword($encoder->encodePassword($user, $password));
 
            $em->persist($user);
            $em->flush();
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to register the user - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $user : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
    /**
     * @Rest\Get("/v1/user.{_format}", name="user", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Gets data for current user logged user."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to get user data."
     * )
     *
     * @SWG\Parameter(
     *     name="id",
     *     in="query",
     *     type="string",
     *     description="The user ID"
     * )
     *
     *
     * @SWG\Tag(name="User")
     */
    public function getUserAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $user_data;
        $message = "";
        try {
            $code = 200;
            $error = false;
            $user_data = $this->getUser();/*->getId();
            $user_data = $em->getRepository("App:User")->findBy([
                "user" => $userId,
            ]);
            if (is_null($user_data)) {
                $user_data = [];
            }*/
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to get User - Error: {$ex->getMessage()}";
        }
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $user_data : $message,
        ];
        return new Response($serializer->serialize($response, "json"));
    }
    /**
     * @Rest\Get("/v1/users.{_format}", name="users", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Gets data for all users."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to get user data."
     * )
     *
     * @SWG\Parameter(
     *     name="id",
     *     in="query",
     *     type="string",
     *     description="The user ID"
     * )
     *
     *
     * @SWG\Tag(name="User")
     */
    public function getUsersAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $users = [];
        $message = "";
        try {
            $code = 200;
            $error = false;
 
            $users = $em->getRepository("App:User")->findAll();
 
            if (is_null($users)) {
                $users = [];
            }
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to get User - Error: {$ex->getMessage()}";
        }
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $users : $message,
        ];
        return new Response($serializer->serialize($response, "json"));
    }
      /**
     * @Rest\Get("/v1/student.{_format}", name="student_list_all", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Gets all students for current logged user."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to get all user students."
     * )
     *
     * @SWG\Parameter(
     *     name="id",
     *     in="query",
     *     type="string",
     *     description="The student ID"
     * )
     *
     *
     * @SWG\Tag(name="Board")
     */
    public function getAllStudentAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $students = [];
        $message = "";
 
        try {
            $code = 200;
            $error = false;
 
            $userId = $this->getUser()->getId();
            $students = $em->getRepository("App:Student")->findBy([
                "user" => $userId,
            ]);
 
            if (is_null($students)) {
                $students = [];
            }
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to get all Students - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $students : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }

    /**
     * @Rest\Post("/v1/student.{_format}", name="student_add", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=201,
     *     description="Student was added successfully"
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error was occurred trying to add new student"
     * )
     *
    * @SWG\Parameter(
     *     name="firstName",
     *     in="body",
     *     type="string",
     *     description="The firstName",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="lastName",
     *     in="body",
     *     type="string",
     *     description="The lastName",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="numPie",
     *     in="body",
     *     type="string",
     *     description="The numero de pie",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="fechaNacimiento",
     *     in="query",
     *     type="string",
     *     description="The Fecha de nacimiento"
     * )
     *
     * @SWG\Tag(name="Student")
     */
    public function addStudentAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $student = [];
        $message = "";
        try {
           $code = 200;
           $error = false;
           
           $firstname = $request->request->get("firstName", null);
           $lastname = $request->request->get("lastName", null);
           $numpie = $request->request->get("numPie", null);
           $fechanacimiento = $request->request->get("fechaNacimiento", null);
           $user = $this->getUser();
            
            $student = new Student();
            
            $student->setFirstName($firstname);
            $student->setLastName($lastname);
            $student->setNumPie($numpie);            
            $student->setFechaNacimiento($this->setDateFormat($fechanacimiento));
            $student->setUser($user);

            $em->persist($student);
            $em->flush();
            
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = " An error has occurred trying to add new student - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $student : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
    /**
     * @Rest\Get("/v1/all_turnos.{_format}", name="turnos_list_all", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Gets all turnos."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to get all turnos."
     * )
     *
     * @SWG\Parameter(
     *     name="id",
     *     in="query",
     *     type="string",
     *     description="The student ID"
     * )
     *
     *
     * @SWG\Tag(name="Turnos")
     */
    public function getAllTurnosAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $turnos = [];
        $message = "";
 
        try {
            $code = 200;
            $error = false;
 
            $turnos = $em->getRepository("App:RegTurno")->findAll();
 
            if (is_null($turnos)) {
                $turnos = [];
            }
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to get all turnos - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $turnos : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
    
    /**
     * @Rest\Post("/v1/turno.{_format}", name="turno_add", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Turno was added successfully"
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error was occurred trying to add new student"
     * )
     *
    * @SWG\Parameter(
     *     name="nombre",
     *     in="body",
     *     type="string",
     *     description="Nombre del turno",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="Localidad",
     *     in="body",
     *     type="string",
     *     description="The lastName",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="fechaInicio",
     *     in="body",
     *     type="string",
     *     description="The numero de pie",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="fechaFin",
     *     in="query",
     *     type="string",
     *     description="The Fecha de nacimiento"
     * )
     *
     * @SWG\Tag(name="Turno")
     */
    public function addTurnoAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $turno = [];
        $message = "";
 
        try {
           $code = 200;
           $error = false;
           
           $nombre = $request->request->get("nombre", null);
           $localidad = $request->request->get("localidad", null);
           $horario = $request->request->get("horario", null);
           $fecha_inicio = $request->request->get("fecha_inicio", null);
           $fecha_fin = $request->request->get("fecha_fin", null);
           $fecha_limite = $request->request->get("fecha_limite", null);
            
            $turno = new RegTurno();
            
            $turno->setNombreTurno($nombre);
            $turno->setLocalidad($localidad);
            $turno->setHorario($horario);

            $turno->setFechaInicio(new DateTime($fecha_inicio));
            $turno->setFechaFin(new DateTime($fecha_fin));
            $turno->setFechaLimite(new DateTime($fecha_limite));

            $em->persist($turno);
            $em->flush();
            
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to add new turno - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $turno : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
    private function setDateFormat($fecha){
        $date = new DateTime();
        $date->setDate($fecha['year'],$fecha['month'],$fecha['date']);
        $date->format('Y-m-d');
        return $date;
    }
     /**
     * @Rest\Get("/v1/turnos.{_format}", name="turnos_list_available_all", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Gets all students for current logged user."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to get all user students."
     * )
     *
     * @SWG\Parameter(
     *     name="id",
     *     in="query",
     *     type="string",
     *     description="The student ID"
     * )
     *
     *
     * @SWG\Tag(name="Turnos")
     */
    public function getAllTurnosFilteredAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $turnos = [];
        $pagin = "";
        $message = "";

        try {
            $code = 200;
            $error = false;

            $year =  $request->query->get('year');
            $pagina =  $request->query->get('pagina');
            $limite =  $request->query->get('limite');

            $turnosPaginator = $em->getRepository("App:RegTurno")->getAllTurnos($pagina,$limite)['paginator'];
            foreach($turnosPaginator as $turno){
                $turnos[] = $turno;
            }
 
            if (is_null($turnos)) {
                $turnos = [];
            }
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to get Turnos - Error: {$ex->getMessage()}";
        }
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $turnos : $message,
        ];
        return new Response($serializer->serialize($response, "json"));
    }
    /**
     * @Rest\Get("/turnos_disponibles.{_format}", name="turnos_list_all_available", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Gets all turnos disponibles"
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to get all available turnos."
     * )
     *
     *
     *
     * @SWG\Tag(name="Turnos")
     */
    public function getTurnosDisponiblesAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $turnos = [];
        $pagin = "";
        $message = "";

        try {
            $code = 200;
            $error = false;

            $turnosPaginator = $em->getRepository("App:RegTurno")->getTurnosDisponibles();
            foreach($turnosPaginator as $turno){
                $turnos[] = $turno;
            }
 
            if (is_null($turnos)) {
                $turnos = [];
            }
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to get Turnos - Error: {$ex->getMessage()}";
        }
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $turnos : $message,
        ];
        return new Response($serializer->serialize($response, "json"));
    }
    /**
     * @Rest\Put("/v1/turno/{id}.{_format}", name="turno_edit", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="The turno was edited successfully."
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to edit the board."
     * )
     *
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="string",
     *     description="The turno ID"
     * )
     *
     * @SWG\Parameter(
     *     name="name",
     *     in="body",
     *     type="string",
     *     description="The board name",
     *     schema={}
     * )
     *
     *
     * @SWG\Tag(name="Turnos")
     */
    public function editTurnoAction(Request $request, $id) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $turno = [];
        $message = "";
 
        try {
            $code = 200;
            $error = false;

            $nombre = $request->request->get("nombre", null);
            $localidad = $request->request->get("localidad", null);
            $horario = $request->request->get("horario", null);
            $fecha_inicio = $request->request->get("fecha_inicio", null);
            $fecha_fin = $request->request->get("fecha_fin", null);
            $fecha_limite = $request->request->get("fecha_limite", null);

            $turno = $em->getRepository("App:RegTurno")->find($id);
 
            if (!is_null($turno)) {
            
                $turno->setNombreTurno($nombre);
                $turno->setLocalidad($localidad);
                $turno->setHorario($horario);
                $turno->setFechaInicio(new DateTime($fecha_inicio));
                $turno->setFechaFin(new DateTime($fecha_fin));
                $turno->setFechaLimite(new DateTime($fecha_limite));
 
                $em->persist($turno);
                $em->flush();
 
            } else {
                $code = 500;
                $error = true;
                $message = "An error has occurred trying to add new Turno - El turno debe existir";
            }
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to edit the current turno - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $turno : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
        /**
     * @Rest\Delete("/v1/turno/{id}.{_format}", name="turno_remove", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Turno was successfully removed"
     * )
     *
     * @SWG\Response(
     *     response=400,
     *     description="An error was occurred trying to remove the Turno"
     * )
     *
     * @SWG\Parameter(
     *     name="id",
     *     in="path",
     *     type="string",
     *     description="The Turno ID"
     * )
     *
     * @SWG\Tag(name="Turno")
     */
    public function deleteTurnoAction(Request $request, $id) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
 
        try {
            $code = 200;
            $error = false;
            $turno = $em->getRepository("App:RegTurno")->find($id);
 
            if (!is_null($turno)) {
                $em->remove($turno);
                $em->flush();
 
                $message = "The board was removed successfully!";
 
            } else {
                $code = 500;
                $error = true;
                $message = "An error has occurred trying to remove the currrent board - Error: The board id does not exist";
            }
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to remove the current board - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
    /**
     * @Rest\Get("/v1/all_registers.{_format}", name="user_list_all", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=200,
     *     description="Gets all alumnos"
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error has occurred trying to get all available turnos."
     * )
     *
     *
     *
     * @SWG\Tag(name="Inscripciones")
     */
    public function getAllInscripciones(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $inscripciones = [];
        $message = "";
 
        try {
            $code = 200;
            $error = false;
 
            $inscripciones = $em->getRepository("App:RegInscripciones")->findAll();
 
            if (is_null($inscripciones)) {
                $inscripciones = [];
            }
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to get all turnos - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 200 ? $inscripciones : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
    /**
     * @Rest\Post("/inscripcion.{_format}", name="inscripcion_add", defaults={"_format":"json"})
     *
     * @SWG\Response(
     *     response=201,
     *     description="Task was added successfully"
     * )
     *
     * @SWG\Response(
     *     response=500,
     *     description="An error was occurred trying to add new task"
     * )
     *
     * @SWG\Parameter(
     *     name="title",
     *     in="body",
     *     type="string",
     *     description="The task title",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="description",
     *     in="body",
     *     type="string",
     *     description="The task description",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="status",
     *     in="body",
     *     type="string",
     *     description="The task status. Allowed values: Backlog, Working, Done",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="priority",
     *     in="body",
     *     type="string",
     *     description="The task priority. Allowed values: High, Medium, Low",
     *     schema={}
     * )
     *
     * @SWG\Parameter(
     *     name="board_id",
     *     in="body",
     *     type="string",
     *     description="The board id of the new task",
     *     schema={}
     * )
     *
     * @SWG\Tag(name="RegUserTurno")
     */
    public function addInscripcionAction(Request $request) {
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $task = [];
        $message = "";
        try {
            $code = 201;
            $error = false;
            $turnos = $request->request->get("turnos", null);
            $student = $request->request->get("student", null);

            if (!is_null($turnos)) {
             
                foreach($turnos as $turno){
                    $inscripcion = new RegInscripciones();
                    $inscripcion->setUserFirstName($request->request->get("userFirstName", null));
                    $inscripcion->setUserLasttName($request->request->get("userLastName", null));
                    $inscripcion->setUserMail($request->request->get("userMail", null));
                    $inscripcion->setUserPhone($request->request->get("userPhone", null));
                    $inscripcion->setStudentFirstName($student['firstName']);
                    $inscripcion->setStudentLasttName($student['lastName']);
                    $inscripcion->setStudentBirthDate(new DateTime($student['fechaNacimiento']));
                    $inscripcion->setStudentNumPie($student['numPie']);
                    $inscripcion->setStudentGroup(0);
                    $inscripcion->setTurnoName($turno['nombre']);
                    $inscripcion->setHorario($turno['horario']);
                    $inscripcion->setLocalidad($turno['localidad']);
                    $inscripcion->setFechaInicio(new DateTime($turno['fecha_inicio']));
                    $inscripcion->setFechaFin(new DateTime($turno['fecha_fin']));

                    $em->persist($inscripcion);
                    
                }
               $em->flush();
            } else {
                $code = 500;
                $error = true;
                $message = "An error has occurred trying to add new registro - Error: You must to provide all the required fields";
            }
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to add new registro - Error: {$ex->getMessage()}";
        }
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 201 ? $inscripcion : $message,
        ];
        return new Response($serializer->serialize($response, "json"));
    }

}
