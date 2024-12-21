package com.example.webdoctruyen.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/success")
    public String success(OAuth2AuthenticationToken authentication, Model model) {
        model.addAttribute("name", authentication.getPrincipal().getAttribute("name"));
        return "success";
    }
}
