<?php
/**
 * User.php
 *
 * User Entity
 *
 * @category   Entity
 * @package    Natacion-API
 * @author     Ignacio Núñez
 */

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use Symfony\Component\Security\Core\User\UserInterface;
use JMS\Serializer\Annotation as Serializer;

/**
 * RegTurnos
 *
 * @ORM\Table(name="reg_turno");
 * @ORM\Entity(repositoryClass="App\Repository\RegTurnoRepository");
 * @ORM\HasLifecycleCallbacks()
 */
class RegTurno
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

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
     * @ORM\Column(name="fecha_lim", type="date")
     */
    protected $fechaLimite;


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
     * @return mixed
     */
    public function getFechaLimite()
    {
        return $this->fechaLimite;
    }

    /**
     * @param mixed $fechaLimite
     * @return self
     */
    public function setFechaLimite($fechaLimite)
    {
        $this->fechaLimite = $fechaLimite;

        return $this;
    }
}
