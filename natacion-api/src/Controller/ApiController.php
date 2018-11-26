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
 
            $user = new User();
            $user->setFirstName($firstname);
            $user->setLastName($lastname);
            $user->setEmail($email);
            $user->setUsername($email);
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
     * @Rest\Get("/v1/user.{_format}", name="users", defaults={"_format":"json"})
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
     *     name="name",
     *     in="body",
     *     type="string",
     *     description="The student name",
     *     schema={}
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
           $code = 201;
           $error = false;
           $name = $request->request->get("name", null);
           $user = $this->getUser();
 
           if (!is_null($name)) {
               $student = new Student();
               $student->setName($name);
               $student->setUser($user);
 
               $em->persist($student);
               $em->flush();
 
           } else {
               $code = 500;
               $error = true;
               $message = "An error has occurred trying to add new student - Error: You must to provide a student name";
           }
 
        } catch (Exception $ex) {
            $code = 500;
            $error = true;
            $message = "An error has occurred trying to add new student - Error: {$ex->getMessage()}";
        }
 
        $response = [
            'code' => $code,
            'error' => $error,
            'data' => $code == 201 ? $student : $message,
        ];
 
        return new Response($serializer->serialize($response, "json"));
    }
}
