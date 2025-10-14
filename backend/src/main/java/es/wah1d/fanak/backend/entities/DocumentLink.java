package es.wah1d.fanak.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class DocumentLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Document document;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private Integer words;

    @Column(
        nullable = false,
        columnDefinition = "ENUM('EN','ES','FR','DE','IT','PT','RU')"
    )
    @Enumerated(EnumType.STRING)
    private Language language;
}
