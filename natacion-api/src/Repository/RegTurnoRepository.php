<?php
namespace App\Repository;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use DateTime;

class RegTurnoRepository extends EntityRepository
{
    public function paginate($dql, $page = 1, $limit = 3)
    {
        $paginator = new Paginator($dql);

        $paginator->getQuery()
            ->setFirstResult($limit * ($page - 1)) // Offset
            ->setMaxResults($limit); // Limit

        return $paginator;
    }
    public function getAllTurnos($currentPage = 1, $limit = 3)
    {
        // Create our query
        $query = $this->createQueryBuilder('p')
        ->getQuery();


        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query);
    }
    public function getTurnosDisponibles(){
        
        $minDate = new DateTime('now');

        $query = $this->createQueryBuilder('p')
            ->where('p.fechaLimite > :fecha')
            ->setParameter('fecha', $minDate)
            ->orderBy('p.fechaLimite', 'ASC')
            ->getQuery()->getResult();
        
        return $query;
    }
}