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
     * @ORM\Column(name="name", type="string", length=150)
     */
    protected $name;
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
    public function getName()
    {
        return $this->name;
    }
    /**
     * @param mixed $name
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;
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