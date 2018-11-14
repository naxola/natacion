<?php 
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="users")
 * @ORM\Entity
 */
class User
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;
    /**
     * @var string|null
     *
     * @ORM\Column(name="role", type="string", length=20, nullable=true)
     */
    private $role;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="surname", type="string", length=255, nullable=true)
     */
    private $surname;

    /**
     * @var string|null
     *
     * @ORM\Column(name="username", type="string", length=255, nullable=true)
     */
    private $username;

    /**
     * @var string|null
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @var string|null
     *
     * @ORM\Column(name="password", type="string", length=255, nullable=true)
     */
    private $password;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     */
    private $image;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

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
    public function getRole()
    {
        return $this->role;
    }
	/**
     * @param mixed $role
     */
    public function setRole($role)
    {
        $this->role = $role;

        return $this;
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
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }
	/**
     * @return mixed
     */
    public function getSurname()
    {
        return $this->surname;
    }
	/**
     * @param mixed $surname
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }
	/**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }
	/**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }
    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }
	/**
     * @param mixed $username
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }
	/**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }
	/**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }
	/**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }
	/**
     * @param mixed $image
     */
    public function setImage($image)
    {
        $this->image = $image;

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
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}