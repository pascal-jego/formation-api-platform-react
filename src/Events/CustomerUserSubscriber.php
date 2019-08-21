<?php

namespace App\Events;

use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class CustomerUserSubscriber implements EventSubscriberInterface {

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomer(GetResponseForControllerResultEvent $event)
    {
        # code...
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
            
        if($customer instanceof Customer && $method === "POST") {
            // Choper l'utilisateur actuellement connecté
            $user = $this->security->getUser();    
            // Assigner l'utilisateur au customer qu'on est en train de créer        
            $customer->setUser($user);            
        }        
    }


}