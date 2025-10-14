package es.wah1d.fanak.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    public String sayHi(){
        return "Hi!";
    }
}
