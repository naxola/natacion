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
 * Student
 *
 * @ORM\Table(name="student")
 * @ORM\Entity(repositoryClass="App\Repository\StudentRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Student
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     * @ORM\Column(name="firstname", type="string", length=150)
     */
    protected $firstname;
    /**
     * @ORM\Column(name="lastname", type="string", length=150)
     */
    protected $lastname;
    /**
     * @ORM\Column(name="numpie", type="integer")
     */
    protected $numpie;
    /**
     * @ORM\Column(name="fecha_nac", type="date")
     */
    protected $fecha_nacimiento;
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="students")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @Serializer\Exclude()
     */
    protected $user;
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
    public function geFirsttName()
    {
        return $this->firstname;
    }
    /**
     * @param mixed $firstname
     * @return self
     */
    public function setFirstName($firstname)
    {
        $this->firstname = $firstname;
        return $this;
    }
    /**
     * @return mixed
     */
    public function geLastName()
    {
        return $this->lastname;
    }
    /**
     * @param mixed $lastname
     * @return self
     */
    public function setLastName($lastname)
    {
        $this->lastname = $lastname;
        return $this;
    }
    /**
     * @return mixed
     */
    public function getNumPie()
    {
        return $this->numpie;
    }
    /**
     * @param mixed $numpie
     * @return self
     */
    public function setNumPie($numpie)
    {
        $this->numpie = $numpie;
        return $this;
    }
    /**
     * @return mixed
     */
    public function getFechaNacimiento()
    {
        return $this->numpie;
    }
    /**
     * @param mixed $fecha_nacimiento
     * @return self
     */
    
    public function setFechaNacimiento($fecha_nacimiento)
    {
        $this->fecha_nacimiento = $fecha_nacimiento;
        return $this;
    }
    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }
    /**
     * @param mixed $user
     * @return self
     */
    public function setUser($user)
    {
        $this->user = $user;
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