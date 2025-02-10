package com.backend.Nalam.AI.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data

@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String name;
    private String role;
    private String number;

    @Column(name = "auth")
    private boolean auth = false;

    @Size(max =120)
    @NotBlank
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="user_roles",joinColumns = @JoinColumn(name = "user_id"),inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles = new HashSet<>();


    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<HealthRecord> healthRecords;

    @OneToMany(mappedBy = "uploadedBy", cascade = CascadeType.ALL)
    private List<HospitalReport> hospitalReports;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<CommunityPost> communityPosts;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<RuralCampaign> ruralCampaigns;

    public Long getId() {
        return id;
    }



    public boolean isAuth() {
        return auth;
    }

    public void setAuth(boolean auth) {
        this.auth = auth;
    }





    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }



    public @Size(max = 120) @NotBlank String getPassword() {
        return password;
    }

    public void setPassword(@Size(max = 120) @NotBlank String password) {
        this.password = password;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<HealthRecord> getHealthRecords() {
        return healthRecords;
    }

    public void setHealthRecords(List<HealthRecord> healthRecords) {
        this.healthRecords = healthRecords;
    }



    public User() {

    }

    public User(String username, String password, String name){
        this.username =username;
        this.password=password;
        this.name = name;
    }
}
