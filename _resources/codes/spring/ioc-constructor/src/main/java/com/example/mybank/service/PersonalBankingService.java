package com.example.mybank.service;

import com.example.mybank.EmailMessageSender;
import com.example.mybank.JmsMessageSender;
import com.example.mybank.WebServiceInvoker;

public class PersonalBankingService {

    private JmsMessageSender jmsMessageSender;
    private EmailMessageSender emailMessageSender;
    private WebServiceInvoker webServiceInvoker;

    public PersonalBankingService(JmsMessageSender jmsMessageSender, EmailMessageSender emailMessageSender, WebServiceInvoker webServiceInvoker) {
        this.jmsMessageSender = jmsMessageSender;
        this.emailMessageSender = emailMessageSender;
        this.webServiceInvoker = webServiceInvoker;
    }
}
