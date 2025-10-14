package es.wah1d.fanak.backend.controllers;

import es.wah1d.fanak.backend.security.AuthenticatedUser;
import es.wah1d.fanak.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping(path = "users")
    public String getUser(@AuthenticationPrincipal AuthenticatedUser user) {
        return "Estás autenticado como " + user.getUsername();
    }

}
