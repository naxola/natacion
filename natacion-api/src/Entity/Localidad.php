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
 * Localidad
 *
 * @ORM\Table(name="localidad")
 * @ORM\Entity(repositoryClass="App\Repository\LocalidadRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Localidad
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @ORM\Column(name="localidad", type="string", length=50)
     */
    protected $localidad;

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

}