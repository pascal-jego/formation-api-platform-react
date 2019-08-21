<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {

    public function updateJwtData(JWTCreatedEvent $event)
    {
        # code...
        // 1. Récupere l'utilisateur (pour avoir son firstNname et lastName)
        $user = $event->getUser();
        // 2. enrichir les data pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lasttName'] = $user->getLastName();

        $event->setData($data);
        
    }
    
}