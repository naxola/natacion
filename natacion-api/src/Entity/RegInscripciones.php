<?php
/**
 * Student.php
 *
 * Student Entity
 *
 * @category   Entity
 * @package    Natacion-API
 * @author     Ignacio Núñez
 */
namespace App\Entity;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use JMS\Serializer\Annotation as Serializer;
/**
 * RegInscripciones
 *
 * @ORM\Table(name="reg_inscripciones")
 * @ORM\Entity(repositoryClass="App\Repository\RegInscripcionesRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class RegInscripciones
{
    
//**********************************
//  Variables
//**********************************
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

     /**
     * @ORM\Column(name="userFirstName", type="string", length=150)
     */
    protected $userFirstName;
     /**
     * @ORM\Column(name="userLastName", type="string", length=150)
     */
    protected $userLastName;
     /**
     * @ORM\Column(name="userMail", type="string", length=150)
     */
    protected $userMail;
     /**
     * @ORM\Column(name="userPhone", type="string", length=150)
     */
    protected $userPhone;
     /**
     * @ORM\Column(name="studentFirstName", type="string", length=150)
     */
    protected $studentFirstName;
     /**
     * @ORM\Column(name="studentLastName", type="string", length=150)
     */
    protected $studentLastName;
    /**
     * @ORM\Column(name="studentBirthDate", type="date")
     */
    protected $studentBirthDate;
    /**
     * @ORM\Column(name="studentNumPie", type="integer", length=2)
     */
    protected $studentNumPie;
    /**
     * @ORM\Column(name="studentGroup", type="integer", length=2)
     */
    protected $studentGroup;
    /**
     * @ORM\Column(name="turnoName", type="string", length=150)
     */
    protected $turnoName;
    /**
     * @ORM\Column(name="horario", type="string", length=25)
     */
    protected $horario;
    /**
     * @ORM\Column(name="nombre_localidad", type="string", length=250)
     */
    protected $localidad;
    /**
     * @ORM\Column(name="fecha_ini", type="date")
     */
    protected $fechaInicio;
    /**
     * @ORM\Column(name="fecha_fin", type="date")
     */
    protected $fechaFin;
    
//**********************************
//  Geters
//**********************************

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @return mixed
     */
    public function getUserFirstName()
    {
        return $this->userFirstName;
    }
    /**
     * @return mixed
     */
    public function getUserLasttName()
    {
        return $this->userLastName;
    }
    /**
     * @return mixed
     */
    public function getUserMail()
    {
        return $this->userMail;
    }
    /**
     * @return mixed
     */
    public function getUserPhone()
    {
        return $this->userPhone;
    }
    /**
     * @return mixed
     */
    public function getStudentFirstName()
    {
        return $this->studentFirstName;
    }
    /**
     * @return mixed
     */
    public function getStudentLasttName()
    {
        return $this->studentLastName;
    }
    /**
     * @return mixed
     */
    public function getStudentBirthDate()
    {
        return $this->studentBirthDate;
    }
    /**
     * @return mixed
     */
    public function getStudentNumPie()
    {
        return $this->studentNumPie;
    }
    /**
     * @return mixed
     */
    public function getStudentGroup()
    {
        return $this->studentGroup;
    }
    /**
     * @return mixed
     */
    public function getTurnoName()
    {
        return $this->turnoName;
    }
    /**
     * @return mixed
     */
    public function getHorario()
    {
        return $this->horario;
    }
    /**
     * @return mixed
     */
    public function getLocalidad()
    {
        return $this->localidad;
    }
    /**
     * @return mixed
     */
    public function getFechaInicio()
    {
        return $this->fechaInicio;
    }
    /**
     * @return mixed
     */
    public function getFechaFin()
    {
        return $this->fechaFin;
    }

//**********************************
//  Seters
//**********************************
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setUserFirstName($value)
    {
        $this->userFirstName = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setUserLasttName($value)
    {
        $this->userLastName = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setUserMail($value)
    {
        $this->userMail = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setUserPhone($value)
    {
        $this->userPhone = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setStudentFirstName($value)
    {
        $this->studentFirstName = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setStudentLasttName($value)
    {
        $this->studentLastName = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setStudentBirthDate($value)
    {
        $this->studentBirthDate = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setStudentNumPie($value)
    {
         $this->studentNumPie = $value;
         return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setStudentGroup($value)
    {
        $this->studentGroup = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setTurnoName($value)
    {
        $this->turnoName = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setHorario($value)
    {
         $this->horario = $value;
         return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setLocalidad($value)
    {
        $this->localidad = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setFechaInicio($value)
    {
        $this->fechaInicio = $value;
        return $this;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setFechaFin($value)
    {
        $this->fechaFin = $value;
        return $this;
    }
//************************************* 
    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $createdAt;
    /**
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $updatedAt;

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
    /**
     * @param mixed $createdAt
     * @return self
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }
    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
    /**
     * @param mixed $updatedAt
     * @return self
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updatedTimestamps()
    {
        $dateTimeNow = new DateTime('now');
        $this->setUpdatedAt($dateTimeNow);
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt($dateTimeNow);
        }
    }
}