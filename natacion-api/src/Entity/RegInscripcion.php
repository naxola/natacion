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
 * RegInscripcion
 *
 * @ORM\Table(name="reg_inscripcion")
 * @ORM\Entity(repositoryClass="App\Repository\RegInscripcionRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class RegInscripcion
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @ORM\Column(name="num_grupo", type="integer", length=2)
     */
    protected $numGrupo;
    /**
     * @ORM\Column(name="nombre_turno", type="string", length=150)
     */
    protected $nombre;
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
    /**
     * @return mixed
     */
    public function getNombreTurno()
    {
        return $this->normbre;
    }

    /**
     * @param mixed $nombre
     * @return self
     */
    public function setNombreTurno($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }
    /**
     * @return mixed
     */
    public function getHorario()
    {
        return $this->normbre;
    }

    /**
     * @param mixed $horario
     * @return self
     */
    public function setHorario($horario)
    {
        $this->horario = $horario;

        return $this;
    }
    /**
     * @return mixed
     */
    public function getLocalidad()
    {
        return $this->localidad;
    }

    /**
     * @param mixed $localidad
     * @return self
     */
    public function setLocalidad($localidad)
    {
        $this->localidad = $localidad;

        return $this;
    }
   /**
     * @return mixed
     */
    public function getFechaInicio()
    {
        return $this->fechaInicio;
    }

    /**
     * @param mixed $fechaInicio
     * @return self
     */
    public function setFechaInicio($fechaInicio)
    {
        $this->fechaInicio = $fechaInicio;

        return $this;
    }
    /**
     * @return mixed
     */
    public function getFechaFin()
    {
        return $this->fechaFin;
    }

    /**
     * @param mixed $fechaFin
     * @return self
     */
    public function setFechaFin($fechaFin)
    {
        $this->fechaFin = $fechaFin;

        return $this;
    }
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Student", inversedBy="inscripciones")
     * @ORM\JoinColumn(name="student_id", referencedColumnName="id", onDelete="CASCADE")
     * @Serializer\Exclude()
     */
    protected $student;
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
    public function getId()
    {
        return $this->id;
    }
    /**
     * @return mixed
     */
    public function getNumGrupo()
    {
        return $this->numGrupo;
    }
    /**
     * @param mixed $numGrupo
     * @return self
     */
    public function setNumGrupo($numGrupo)
    {
        $this->numGrupo = $numGrupo;
        return $this;
    }   
    /**
     * @return mixed
     */
    public function getStudent()
    {
        return $this->student;
    }
    /**
     * @param mixed $student
     * @return self
     */
    public function setStudent($student)
    {
        $this->student = $student;
        return $this;
    }
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